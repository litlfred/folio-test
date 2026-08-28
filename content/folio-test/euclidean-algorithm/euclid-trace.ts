import { example } from "../../schema/builders";

export default example({
  label: "ex:euclid-trace",
  title: "Computing gcd(1071, 462)",
  interprets: "alg:euclid",
  uses: ["alg:euclid"],
});
