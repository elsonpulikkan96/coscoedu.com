import { useEffect } from "react";
import { site } from "../config/site";

// Minimal client-side SEO: sets <title> and meta description per route.
// For full SSR meta/schema you'd move to a framework like Next.js (see notes).
export function useSeo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.shortName}` : `${site.name} | Study Abroad Consultants`;
    document.title = fullTitle;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
