import { remark } from "../../schema/builders";

export default remark({
  label: "rem:bezout-consequences",
  title: "What the identity buys",
  interprets: "thm:bezout",
  uses: ["thm:bezout"],
});
