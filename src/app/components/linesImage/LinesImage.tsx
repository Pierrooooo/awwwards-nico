'use client';

import { useEffect, useRef } from "react";
import { scrollImageTransition } from "@/app/animations/animationsgsap";
import LineImage from "../lineImage/lineImage";
import styles from "./section.module.css";
import Image from 'next/image';

interface LineImageProps {
  
}

export default function LinesImage({  }: LineImageProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  const lineImages = [
    { id: "01", title: "Orchidée", image: "/assets/images/CULTUREL/ORCHIDEE/NC-Edited_ORCHIDEEOrchidee_v01-29.jpg", date: "23/07/2024", invert: false },
    { id: "42", title: "Paléon", image: "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-31.jpg", date: "23/07/2024", invert: true },
    { id: "183", title: "Serre", image: "/assets/images/CULTUREL/SERRE/NC-Edited_SerreSerre-12.jpg", date: "23/07/2024", invert: false },
    { id: "98", title: "Les vents de la colère", image: "/assets/images/ACTIVISME/LES VENTS DE LA COLERE/231119-LVC4-NC-Gannet flying-_DSC5577.jpg", date: "23/07/2024", invert: true },
  ];

  return (
    <section ref={containerRef} className={`section_lines_image full_container`}>

      {lineImages.map((item) => (
        <LineImage key={item.id} image={item.image} id={item.id} title={item.title} date={item.date} invert={item.invert}/>
      ))}

    </section>
  );
}
