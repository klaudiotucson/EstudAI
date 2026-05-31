import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const SAFE_URI = /^(?:(?:https?|mailto|tel):|data:image\/(?:png|jpeg|jpg|gif|webp);base64,)/i;

export function markdownToSafeHtml(rawText: string) {
  const html = marked.parse(rawText || "") as string;

  return DOMPurify.sanitize(html, {
    ALLOWED_URI_REGEXP: SAFE_URI,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input", "button"],
    FORBID_ATTR: ["style", "srcdoc"],
  });
}
