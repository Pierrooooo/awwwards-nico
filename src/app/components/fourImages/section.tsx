'use client';

import { useRef } from "react";
import styles from './section.module.css'
import Image from "next/image";

interface FourImagesProps {
  items: { title?: string; imageSrc: string[] }[];
}

export default function FourImages({ items }: FourImagesProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className={`section_four_images ${styles.section_container} full_container`}>
      {items.map((item, index) => (
        <div key={index} className={`${styles.images_container}`}>
          <div className={`${styles.image}`}>
            <Image src={item.imageSrc[0]} alt={`${item.title} 1`} width={800} height={800} />
          </div>
          <div className={`${styles.image}`}>
            <Image src={item.imageSrc[1]} alt={`${item.title} 2`} width={800} height={800} />
          </div>
          <p className={`title_L ${styles.title}`}>{item.title}</p>
        </div>
      ))}
    </section>
  );
}
