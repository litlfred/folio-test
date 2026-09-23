import { table } from "../../schema/builders";

export default table({
  label: "tbl:storage-temperatures",
  title: "Storage temperatures",
  caption: "Storage temperature ranges by vaccine type.",
  uses: ["prose:overview"],
});
