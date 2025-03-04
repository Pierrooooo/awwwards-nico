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
    scrollImageTransition(".images_container", `.${styles.paysage_image}`);
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
