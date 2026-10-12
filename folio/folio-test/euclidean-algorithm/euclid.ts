import { algorithm } from "../../schema/builders";

export default algorithm({
  label: "alg:euclid",
  title: "The Euclidean algorithm",
  uses: ["lem:euclid-step"],
  examples: ["ex:euclid-trace"],
});
