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
content/folio-test/          the document
  folio-test.ts             its manifest — chapters, in reading order
  <chapter>/<chapter>.ts   a chapter manifest — sections, in reading order
  <chapter>/<root>.ts      a block manifest
  <chapter>/<root>.md      that block's prose
  <chapter>/<root>.qa.json QA sidecar (machine-written — never hand-edit)
content/schema/            re-export shim for the platform's builders
library/                   ingested source documents (read-only reference)
uploads/                   source PDFs, for offline citation verification
folio-assistant/              the platform
.beans/                    the work plan
```

## Commands

```sh
bun run folio-assistant/src/index.ts --stdio --repo .   # the MCP server
bun run folio-assistant/src/index.ts --check-deps       # what's installed
```

## Work plan — use `beans`

`.beans/` is committed, so the plan survives a fresh container and a sibling
session sees it. Claim before you work; never resolve a sibling's bean.

```sh
folio-assistant/scripts/install-beans.sh
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
