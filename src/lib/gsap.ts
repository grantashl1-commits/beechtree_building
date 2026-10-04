import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

// GSAP (incl. DrawSVG & SplitText) is 100% free for commercial use since v3.13.
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP)
gsap.defaults({ ease: "expo.out", duration: 1 })

export { gsap, ScrollTrigger, SplitText, useGSAP }

export const MOTION_OK = "(prefers-reduced-motion: no-preference)"

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
