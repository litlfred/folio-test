import { chapter, section } from "../../schema/builders";

/**
 * The Euclidean algorithm.
 *
 * Three sections, in reading order: what a common divisor is, the algorithm
 * that finds the greatest one, and the identity that falls out of running it
 * backwards.
 *
 * Deliberately carries no `definition` blocks. That kind requires a sibling
 * `.lean` file (constraint `lean-file-exists`, a hard error, not a warning),
 * and this folio has no Lean toolchain — so a `definition` here would mean
 * committing a formalization nothing could check. The definitional content
 * lives in `prose:divisibility` instead, and `rem:lean-status` says so in the
 * text rather than leaving a reader to infer it.
 */
export default chapter({
  title: "The Euclidean algorithm",
  label: "chap:euclid",
  number: 1,
  sections: [
    section({
      title: "Divisibility and common divisors",
      label: "sec:divisibility",
      blocks: ["divisibility", "gcd-zero", "lean-status"],
    }),
    section({
      title: "The algorithm",
      label: "sec:algorithm",
      blocks: ["euclid-step", "euclid-step-proof", "euclid", "euclid-trace", "euclid-trace-table"],
    }),
    section({
      title: "Bézout's identity",
      label: "sec:bezout",
      blocks: ["bezout", "bezout-proof", "bezout-consequences"],
    }),
  ],
});
