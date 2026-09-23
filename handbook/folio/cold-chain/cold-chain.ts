import { paper, chapterRef } from "../schema/builders";

/**
 * Cold Chain Handbook
 *
 * The document manifest. `chapters` is an ORDERED list — its order is the
 * reading order, and it is the only place that order is recorded. To move a
 * chapter, move its entry here; never rename the directory to encode position,
 * because labels, uses[], feedback and QA sidecars all key on names.
 */
export default paper({
  title: "Cold Chain Handbook",
  authors: ["Folio Test"],
  date: new Date().toISOString().slice(0, 10),
  chapters: [
    chapterRef({ dir: "introduction" }),
  ],
});
