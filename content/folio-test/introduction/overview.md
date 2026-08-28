This is the first block of Folio Test. Replace this text with the real
opening — this file is a placeholder, not content.

A **block** is the unit of authorship, review, feedback and QA in a folio. It
is two files that share a root name: `overview.ts` holds the metadata (kind,
label, title, `uses[]`) and `overview.md` holds the prose you are reading.
They are separate so a reviewer's diff is over the writing, not the manifest.

The kinds this folio may use are the eight document kinds plus `definition`, `theorem`, `lemma`, `proposition`, `corollary`, `conjecture` and `proof`.

Ask your agent to *add a chapter* or *add a section on X*, and it will write
the manifests and wire them up. Run `content_validate` when you want to know
whether the corpus is sound.
