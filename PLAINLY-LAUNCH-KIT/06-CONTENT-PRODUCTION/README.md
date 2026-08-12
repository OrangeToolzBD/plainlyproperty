# Content production

Two stages, deliberately separated. **Stage 1 returns only sourced facts. Stage 2 may use nothing
else.** A model asked to research and write in one step fills gaps with plausible prices, and you
cannot tell which parts are real. This design makes that structurally impossible.

## Setup

```bash
export PERPLEXITY_API_KEY=...
export BRAVE_API_KEY=...
export ANTHROPIC_API_KEY=...
pip install requests
```

Set `MODEL` in `run_content.py` to whichever model you intend to bill.

## Run

```bash
python run_content.py --stage research     # per page: 1 Perplexity call + 3 Brave calls
python run_content.py --stage write        # submits one Anthropic batch
python run_content.py --stage collect      # polls, writes pages/*.md
```

## Do page 01 alone first

Edit `pages_final.json` down to page 1, run all three stages, and read the output end to end
against its research pack by hand. A prompt fault found on one page costs one call; the same fault
found after a thirteen-page batch costs the batch and the time to notice.

## Then batch in the build order

| Batch | Pages | When |
|---|---|---|
| 1 | 01 | Now — it is the only page with a revenue path this quarter |
| 2 | 04, 05, 06 | Once page 01 is live and advertising is running |
| 3 | the rest | Month 3, once the real click-to-enquiry rate is known |

## Two API details that will cost you an hour each

- **Brave rejects `country=AE`** with HTTP 422 — the enum does not include it. Omit the parameter
  and carry the geography in the query text. `run_content.py` already does this; if you rewrite it,
  do not reintroduce the bug. It returns zero results silently and reads as an empty market.
- **The Batches API is roughly half the per-token cost** of single calls and is designed for
  exactly this shape of work. Research and quality-checking stay outside the batch because they
  need judgement; only the writing step is mechanical enough to batch.

## After collection

Every page goes through `05-SEO-AEO-GEO/05-definition-of-done.md` before it ships. In particular:
grep for `[NEEDS SOURCE]` and resolve each one with a phone call, and check every number on the
page against the research JSON.
