import { lemma } from "../../schema/builders";

export default lemma({
  label: "lem:euclid-step",
  title: "The reduction step",
  uses: ["prose:divisibility"],
  proofs: ["prf:euclid-step"],
});
