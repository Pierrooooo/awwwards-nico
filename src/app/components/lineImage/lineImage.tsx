'use client';

import { useEffect, useRef } from "react";
import { slideDown } from "@/app/animations/animationsgsap";
import styles from "./lineImage.module.css";
import Image from 'next/image';

interface LineImageProps {
  image: string;
  id: string;
  title: string;
  date: string;
  invert: boolean;
}

export default function LineImage({ image, id, title, date, invert }: LineImageProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    slideDown(
      ".section_line_image .anim_img_bg",
      ".section_line_image .anim_img_bg",
      `top bottom`,
      "bottom top",
      70
    );
  })

  return (
    <div ref={containerRef} className={`section_line_image ${styles.component_container} ${invert ? ` ${styles.invert}` : ''} ${styles.section_container}`}>
      <div className={`image_container ${styles.image_container}`}>
        <Image className='anim_img_bg' src={image} alt={title} width={1200} height={400} />
      </div>
      <div className={styles.infos_container}>
        <p className={`text_XXL ${styles.section_text_id}`}>{id}</p>
        <p className={`title_XL ${styles.section_title}`}>{title}</p>
        <p className={`para_s ${styles.section_text_date}`}>{date}</p>
      </div>
    </div>
  );
}
