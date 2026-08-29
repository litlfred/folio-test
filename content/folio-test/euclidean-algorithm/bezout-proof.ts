import { proof } from "../../schema/builders";

export default proof({
  label: "prf:bezout",
  title: "Proof of Bézout's identity",
  of: "thm:bezout",
  uses: ["thm:bezout", "alg:euclid", "lem:euclid-step"],
});
