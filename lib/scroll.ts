import { ANCHORS } from "./content";

/** Smooth-scroll to a named section: progress anchors inside the pinned track, or a plain element id. */
export function scrollToTarget(target: string) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
  const track = document.getElementById("camera-track");
  if (target in ANCHORS && track) {
    const range = Math.max(0, track.offsetHeight - window.innerHeight);
    const top = Math.round(track.offsetTop + range * ANCHORS[target]);
    window.scrollTo({ top, behavior });
    return;
  }
  document.getElementById(target)?.scrollIntoView({ behavior, block: "start" });
}
