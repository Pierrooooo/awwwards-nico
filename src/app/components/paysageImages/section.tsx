'use client';

import { useEffect, useRef } from "react";
import { scrollImageTransition } from "@/app/animations/animationsgsap";
import styles from "./section.module.css";

interface PaysageImagesProps {
  images: string[];
}

export default function PaysageImages({ images }: PaysageImagesProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const imageElements = containerRef.current.querySelectorAll(`.${styles.paysage_image}`);

    // gsap.timeline({
    //     scrollTrigger: {
    //       trigger: "images_container",
    //       start: "top top",
    //       end: "+=300%",
    //       scrub: 1,
    //       pin: true
    //     }
    //   })
    //   .fromTo(
    //     imageElements,
    //     {
    //       clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    //     },
    //     {
    //       clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    //       ease: 'power2.inOut',
    //       stagger: 1
    //     }
    //   );

    scrollImageTransition(".section_paysageimages", `.${styles.paysage_image}`);
  }, [images]);

  return (
    <section ref={containerRef} className={`section_paysageimages ${styles.paysage_container}`}>
      <div className="images_container">
        {images.map((src, index) => (
          <div
            key={index}
            className={styles.paysage_image}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
    </section>
  );
}
