import { gsap } from "gsap";

if (typeof window !== "undefined") {
    gsap.registerPlugin();
}

export const fadeIn = (
    target: gsap.TweenTarget,
    duration: number = 1,
    delay: number = 0
) => {
    gsap.fromTo(
        target,
        { opacity: 0 },
        { opacity: 1, duration, delay, ease: "power2.out" }
    );
};

export const slideDown = (
    target: gsap.TweenTarget,
    trigger: string,
    start: string = "center bottom",
    end: string = "top center",
    distance: number = 200,
    duration: number = 1,
    delay: number = 0,
    scrub: number = 1,
    markers: boolean = false
) => {
    if (typeof window !== "undefined") {
        const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            target,
            { y: `-${distance}` },
            {
                y: 0,
                duration,
                delay,
                scrollTrigger: {
                    trigger,
                    start,
                    end,
                    scrub,
                    markers
                },
            }
        );
    }
};

export const slideInFromBottom = (
    target: gsap.TweenTarget,
    duration: number = 1,
    delay: number = 0,
    distance: string = "100px",
    stagger: number = 0
) => {
    gsap.to(
        target,
        { y: "0", duration, delay, stagger, ease: "power2.out" }
    );
};

export const scaleUp = (
    target: gsap.TweenTarget,
    duration: number = 1,
    delay: number = 0
) => {
    gsap.fromTo(
        target,
        { scale: 0 },
        { scale: 1, duration, delay, ease: "back.out(1.7)" }
    );
};

export const scrollReveal = (
    target: gsap.TweenTarget,
    trigger: string,
    start: string = "top bottom",
    end: string = "bottom 20%",
    scrub: boolean = false,
    delay: number = 0,
    markers: boolean = false
) => {
    if (typeof window !== "undefined") {
        const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            target,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger,
                    start,
                    end,
                    scrub,
                    markers
                },
            }
        );
    }
};

export const scrollImageTransition = (containerSelector: string, imageSelector: string) => {
  if (typeof window !== "undefined") {
    const { gsap } = require("gsap");
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    
    gsap.registerPlugin(ScrollTrigger);

    const sections: HTMLElement[] = gsap.utils.toArray(imageSelector);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerSelector,
        start: "top bottom",
        end: "top top",
        scrub: true,
        markers: true,
        // pin: true,
        toggleActions: "play reverse",
      }
    });

    sections.forEach((section) => {
      tl.fromTo(
        section,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}
        // { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power2.out" }
      );
    });
  }
};




export const killAllAnimations = () => {
    gsap.killTweensOf("*");
};

export const createTimeline = () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });
    return tl;
};

export default {
    fadeIn,
    slideDown,
    slideInFromBottom,
    scaleUp,
    scrollReveal,
    scrollImageTransition,
    killAllAnimations,
    createTimeline,
};
