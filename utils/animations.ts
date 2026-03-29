import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// Type for the target can be a string (selector) or a direct element
type GsapTarget = string | Element | null;

export const animateWithGsap = (
  target: GsapTarget, 
  animationProps: gsap.TweenVars, 
  scrollProps?: object
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    }
  });
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: React.RefObject<THREE.Group | null>,
  rotationState: number,
  firstTarget: GsapTarget,
  secondTarget: GsapTarget,
  animationProps: gsap.TweenVars
) => {
  // 1. Animate Rotation
  if (rotationRef.current) {
    timeline.to(rotationRef.current.rotation, {
      y: rotationState,
      duration: 1,
      ease: 'power2.inOut'
    });
  }

  // 2. Animate the exiting view (e.g., moves to -100%)
  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  );

  // 3. Animate the entering view (MUST move to 0 to be visible)
  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  );
};