# AGENTS.md — Folio Test

This is a **folio**: the content repository. The authoring platform —
skills, schemas, MCP tools, the publication pipeline — is
[folio-assistant](https://github.com/litlfred/folio-assistant.git), checked out at `folio-assistant/`.

This file is the **agent-generic** source of truth, read natively by Claude
Code, Gemini CLI, Antigravity, Cursor and Copilot. `CLAUDE.md` and
`GEMINI.md` are thin stubs pointing here.

> **Content lives here; formalism lives in the platform.** If you are about to
> add a schema, a validator, a QA criterion or a skill, it belongs in
> folio-assistant, not in this repo. If you are about to add a chapter, a
> recommendation or a table, it belongs here.

## Content type: `paper`

A **paper** folio: structured prose whose mathematics is backed by
machine-checked Lean 4 and rendered through LaTeX. Every kind is available,
including the seven whose assertion is a formal claim.

A paper is a document plus those kinds — so the document skills apply here too,
and the Markdown render path (`document_render_md`, `document_render_html`)
works on a machine with no TeX, which is the usual case while drafting.

## Layout

```
folio/folio-test/          the document
  folio-test.ts             its manifest — chapters, in reading order
  <chapter>/<chapter>.ts   a chapter manifest — sections, in reading order
  <chapter>/<root>.ts      a block manifest
  <chapter>/<root>.md      that block's prose
folio/schema/            re-export shim for the platform's builders
test/results/block-qa/     QA verdicts, one per block, mirroring folio/ (machine-written working copy — published to qa-reports)
test/attestations/        reviewer judgements and baseline attestations (committed on main)
library/                   ingested source documents (read-only reference)
uploads/                   source PDFs, for offline citation verification
folio-assistant/              the platform
beans/                    the work plan (mounted from its declared branch)
todos/                    people's outstanding items (mounted likewise)
```

## Commands

```sh
bun run folio-assistant/cat-harness-tools/src/index.ts --stdio --repo .   # the MCP server
bun run folio-assistant/cat-harness-tools/src/index.ts --check-deps       # what's installed
bun run folio-assistant/cat-harness-tools/content/pipeline/qa-sweep.ts folio  # QA every block
```

## QA — every block is checked from the first commit

`qa-sweep` runs every criterion a script can check against each block, and
writes one verdict file per block under `test/results/block-qa/`. Derived QA
verdicts live on the orphan `qa-reports` branch (published by CI), rather than
being committed to `main`. Judgements stay on `main` in `test/attestations/`.
The working copy under `test/results/` is machine-written.

The staging preview sweeps each pull request as well (`.github/workflows/staging.yml`),
so the review page's QA column reports that build. `.github/workflows/qa-sweep.yml`
runs the full sweep in CI, and `qa-sweep-nightly.yml` refreshes stale verdicts;
both are dispatch-only until you enable their triggers. Criteria that need an
agent's judgement (voice, exposition, adversarial review) are not run by the
sweep; they stay unaudited until an agent records them.

## Work plan — use `beans`

`beans/` and `todos/` are this folio's STATE. Where each is kept is declared
in `folio-test.json` — by default on its own branch,
`cat/folio-test/beans` and `cat/folio-test/todos`, mounted at those paths by the
session-start hook (`state:mount`) and never committed to `main`. Either way
the plan survives a fresh container and a sibling session sees it. Claim before
you work; never resolve a sibling's bean.

```sh
folio-assistant/cat-harness-tools/scripts/install-beans.sh
beans list
beans create "<title>"
beans <id> --status in-progress
```

**Check before you create** — `beans create` is not idempotent and dedupes on
nothing, so re-entering a step duplicates the plan rather than no-op'ing.

## The skills are in the platform, not here

Ask for them by name and the agent loads them over MCP (`skill_fetch`):

| Package | What |
|---|---|
| `folio-core` | content-agnostic: bean coordination, editorial review, QA |
| `folio-document-adapter` | structure and prose authoring — applies to papers too |
| `folio-paper-adapter` | Lean generation, proof review, LaTeX build, formalization audits |

Do not copy a skill body into this repo. It will drift, and the platform's copy
is the one every other folio is reading.
