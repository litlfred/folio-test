import { prose } from "../../schema/builders";

export default prose({
  label: "prose:overview",
  title: "Overview",
  // Blocks a reader must already have read to follow this one. Editorial
  // judgement, direct neighbours only — never derived, never the transitive
  // closure. This block is first, so it has none.
  uses: [],
});
