This folio declares `contentType: "paper"`, so every block kind is available
to it — including the seven whose assertion is a formal mathematical claim.
None of the results below carry a Lean formalization, and `content_validate`
says so: each theorem and lemma draws a `provable-lean-warning`.

That warning is correct and is left standing rather than suppressed. The
environment this chapter was authored in has no Lean toolchain, so any
`.lean` sibling committed here would be a formalization nothing had compiled
— which is worse than none, because a `lean.ref` present in a manifest reads
as a claim that something was checked.

The chapter also carries no `definition` blocks for the same reason. Unlike
the theorem-like kinds, `definition` requires a `.lean` sibling as a *hard*
error, so the choice there is between formalizing and not using the kind. The
definitional content sits in [the opening prose](#prose:divisibility)
instead.
