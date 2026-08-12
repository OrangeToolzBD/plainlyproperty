#!/usr/bin/env python3
"""Two-stage content pipeline: research -> inject -> write.

Stage 1 runs per page against Perplexity and Brave, and writes a research pack to disk.
Stage 2 submits every page to the Anthropic Message Batches API with its pack injected.
Batches is roughly half the per-token cost of single calls and returns within 24h; for 13
pages it typically lands in minutes.

    python run_content.py --stage research      # ~13 API calls, few minutes
    python run_content.py --stage write         # submits one batch
    python run_content.py --stage collect       # polls and writes pages/*.md
"""
import os, sys, json, time, argparse, pathlib, requests

ROOT = pathlib.Path(__file__).parent
PAGES = json.loads((ROOT / 'pages_final.json').read_text(encoding='utf-8'))
(ROOT / 'research').mkdir(exist_ok=True)
(ROOT / 'pages').mkdir(exist_ok=True)

PPLX = os.environ['PERPLEXITY_API_KEY']
BRAVE = os.environ['BRAVE_API_KEY']
ANTHROPIC = os.environ['ANTHROPIC_API_KEY']
MODEL = 'claude-opus-4-6'          # set to the model you intend to bill

RESEARCH_PROMPT = open(ROOT / 'prompt_research.txt', encoding='utf-8').read()
WRITE_PROMPT = open(ROOT / 'prompt_write.txt', encoding='utf-8').read()


def brave(q, n=12):
    """Brave finds the primary source. It is never the citation itself."""
    r = requests.get('https://api.search.brave.com/res/v1/web/search',
                     headers={'X-Subscription-Token': BRAVE, 'Accept': 'application/json'},
                     params={'q': q, 'count': n}, timeout=30)
    # NOTE: Brave rejects country=AE with HTTP 422 - the enum does not include it.
    # Carry the geo in the query text instead.
    if r.status_code != 200:
        return []
    return [(x.get('title', ''), x.get('url', ''), x.get('description', ''))
            for x in r.json().get('web', {}).get('results', [])]


def perplexity(prompt):
    r = requests.post('https://api.perplexity.ai/chat/completions',
        headers={'Authorization': 'Bearer ' + PPLX, 'Content-Type': 'application/json'},
        json={'model': 'sonar-pro',
              'messages': [{'role': 'user', 'content': prompt}],
              'temperature': 0.1}, timeout=180)
    r.raise_for_status()
    j = r.json()
    return dict(text=j['choices'][0]['message']['content'],
                citations=j.get('citations', []))


def stage_research():
    for p in PAGES:
        out = ROOT / 'research' / ('%02d.json' % p['no'])
        if out.exists():
            print('skip', p['slug']); continue
        primary = p['kws'][0]['kw'] if p['kws'] else p['slug'].strip('/').replace('-', ' ')
        prompt = RESEARCH_PROMPT.format(
            slug=p['slug'], primary=primary,
            vol=p['vol'], cpc=(p['kws'][0]['cpc_aed'] if p['kws'] else 0),
            fmt=p['fmt'], role_note=p['role'])
        res = perplexity(prompt)
        # Brave supplies the primary-source URLs Perplexity may have summarised
        res['brave'] = {q: brave(q) for q in
                        [primary + ' dubai price', primary + ' dubai official',
                         primary + ' dld rera rule']}
        out.write_text(json.dumps(res, indent=1), encoding='utf-8')
        print('researched', p['slug'])
        time.sleep(1)


def stage_write():
    reqs = []
    for p in PAGES:
        pack = (ROOT / 'research' / ('%02d.json' % p['no']))
        if not pack.exists():
            print('NO RESEARCH PACK - skipping', p['slug']); continue
        kwblock = '\n'.join('  %-46s %5d/mo   AED %6.2f' % (k['kw'], k['vol'], k['cpc_aed'])
                             for k in p['kws']) or '  (support page - no head term)'
        body = WRITE_PROMPT.format(slug=p['slug'], title=p['title'], meta=p['meta'],
                                   fmt=p['fmt'], kwblock=kwblock,
                                   research_json=pack.read_text(encoding='utf-8')[:60000])
        reqs.append({'custom_id': 'page-%02d' % p['no'],
                     'params': {'model': MODEL, 'max_tokens': 8000,
                                'messages': [{'role': 'user', 'content': body}]}})
    r = requests.post('https://api.anthropic.com/v1/messages/batches',
        headers={'x-api-key': ANTHROPIC, 'anthropic-version': '2023-06-01',
                 'content-type': 'application/json'},
        json={'requests': reqs}, timeout=120)
    r.raise_for_status()
    bid = r.json()['id']
    (ROOT / 'batch_id.txt').write_text(bid)
    print('submitted batch', bid, 'with', len(reqs), 'pages')


def stage_collect():
    bid = (ROOT / 'batch_id.txt').read_text().strip()
    h = {'x-api-key': ANTHROPIC, 'anthropic-version': '2023-06-01'}
    while True:
        j = requests.get('https://api.anthropic.com/v1/messages/batches/' + bid,
                         headers=h, timeout=60).json()
        if j['processing_status'] == 'ended':
            break
        print('status', j['processing_status'], j.get('request_counts')); time.sleep(30)
    res = requests.get(j['results_url'], headers=h, timeout=300)
    by_no = {'page-%02d' % p['no']: p for p in PAGES}
    for line in res.text.splitlines():
        if not line.strip(): continue
        row = json.loads(line)
        p = by_no[row['custom_id']]
        if row['result']['type'] != 'succeeded':
            print('FAILED', p['slug'], row['result']); continue
        text = row['result']['message']['content'][0]['text']
        name = p['slug'].strip('/').replace('/', '-') or 'home'
        (ROOT / 'pages' / (name + '.md')).write_text(text, encoding='utf-8')
        print('wrote', name + '.md', len(text.split()), 'words')


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--stage', required=True, choices=['research', 'write', 'collect'])
    a = ap.parse_args()
    {'research': stage_research, 'write': stage_write, 'collect': stage_collect}[a.stage]()
