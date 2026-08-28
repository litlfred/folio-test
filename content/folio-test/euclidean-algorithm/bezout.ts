import { theorem } from "../../schema/builders";

export default theorem({
  label: "thm:bezout",
  title: "Bézout's identity",
  uses: ["prose:divisibility", "lem:euclid-step"],
  proofs: ["prf:bezout"],
});
