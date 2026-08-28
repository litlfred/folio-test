import { remark } from "../../schema/builders";

export default remark({
  label: "rem:gcd-zero",
  title: "The convention at zero",
  interprets: "prose:divisibility",
  uses: ["prose:divisibility"],
});
