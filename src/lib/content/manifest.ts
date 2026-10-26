import type { ContentManifest } from "@/lib/validation/content";

/**
 * Manifest of version-controlled question packs.
 * JSON packs live under content/jamb/subjects/.
 */
export const contentManifest: ContentManifest = {
  version: 1,
  subjects: [
    {
      slug: "biology",
      name: "Biology",
      description:
        "Cell biology, ecology, genetics, physiology, and evolution practice.",
      files: ["subjects/biology/sample-2020-2025.json"],
    },
    {
      slug: "english",
      name: "English Language",
      description: "Comprehension, lexis, and structure practice.",
      files: ["subjects/english/sample-study.json"],
    },
    {
      slug: "mathematics",
      name: "Mathematics",
      description: "Algebra and arithmetic practice.",
      files: ["subjects/mathematics/sample-study.json"],
    },
  ],
};
