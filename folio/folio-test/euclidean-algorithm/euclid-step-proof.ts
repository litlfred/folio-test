import { proof } from "../../schema/builders";

export default proof({
  label: "prf:euclid-step",
  title: "Proof of the reduction step",
  of: "lem:euclid-step",
  uses: ["lem:euclid-step", "prose:divisibility"],
});
