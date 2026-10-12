import { table } from "../../schema/builders";

export default table({
  label: "tbl:euclid-trace",
  title: "Trace of gcd(1071, 462)",
  caption: "Each row is one iteration; the algorithm returns the last non-zero remainder.",
  uses: ["ex:euclid-trace", "alg:euclid"],
});
