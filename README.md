# folio-test

Test repo for folio assistant — a **paper folio** authored with
[folio-assistant](https://github.com/litlfred/folio-assistant).

## Layout

```
content/folio-test/            the paper
  folio-test.ts                its manifest — chapters, in reading order
  introduction/
    introduction.ts            the chapter manifest — sections, in reading order
    overview.ts                a block manifest: kind, label, title, uses[]
    overview.md                that block's prose
content/schema/                builder shim — the one place the platform path is written
library/                       ingested source documents (read-only reference)
uploads/                       source PDFs, for offline citation verification
folio-assistant/               the platform, as a git submodule
.beans/                        the work plan
```

Read [`AGENTS.md`](./AGENTS.md) first — it is the agent-generic entry point,
with `CLAUDE.md` and `GEMINI.md` as thin stubs pointing at it.

## Getting started

```sh
git clone --recurse-submodules https://github.com/litlfred/folio-test.git
cd folio-test
(cd folio-assistant && bun install)
```

`.mcp.json` is already wired, so Claude Code, Gemini CLI, Antigravity or any
other MCP harness picks the server up on launch. Then ask your agent to *add a
chapter*, or run the server directly:

```sh
bun run folio-assistant/src/index.ts --stdio --repo .
bun run folio-assistant/src/index.ts --check-deps   # what's installed
```

## Content type: `paper`

`folio.config.json` declares `contentType: "paper"`, so every block kind is
available — including the seven whose assertion is a formal mathematical claim
(`definition`, `theorem`, `lemma`, `proposition`, `corollary`, `conjecture`,
`proof`), each backed by a `.lean` sibling and typeset through LaTeX.

A paper **is** a document plus those kinds, so the TeX-free render path works
here too and is the one to use while drafting:

| | Needs |
|---|---|
| `document_render_md` / `_html` / `_pdf` | pandoc (+ weasyprint for PDF) |
| `paper_render_pdf` / `formula_render` | TeX Live |
| `lean_build` / `lean_check` | Lean 4 via elan |

Neither Lean nor TeX is installed by default; `--check-deps` reports what is
missing. If this folio turns out not to need formal mathematics, switching
`contentType` to `"document"` drops both toolchains — `content_profile_check`
will then list any math blocks standing in the way.

## Note on the submodule pin

`folio-assistant` is currently pinned to
[PR #142](https://github.com/litlfred/folio-assistant/pull/142)'s branch rather
than to `main`, because the `folio_init` scaffolder that generated this repo
has not merged yet. Once it does, bump the submodule to `main`:

```sh
git -C folio-assistant fetch origin main && git -C folio-assistant checkout origin/main
git add folio-assistant && git commit -m "chore: track folio-assistant main"
```
