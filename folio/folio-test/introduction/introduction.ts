import { chapter, section } from "../../schema/builders";

/**
 * The chapter manifest.
 *
 * A block reaches the rendered document IFF some section's `blocks` names it.
 * Writing `<root>.ts` and `<root>.md` is not enough — a block nobody lists
 * renders nowhere and is swept by nothing. Adding the name here is part of
 * adding a block, not a follow-up.
 */
export default chapter({
  title: "Introduction",
  label: "chap:introduction",
  tabLabel: "I",
  sections: [
    section({
      title: "Overview",
      label: "sec:overview",
      blocks: ["overview"],
    }),
  ],
});
