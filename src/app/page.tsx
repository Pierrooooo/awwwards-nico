import Hero from "./components/hero/hero";
import LinesImage from "./components/linesImage/LinesImage";
import PaysageImages from "./components/paysageImages/section";
import FourImages from "./components/fourImages/section";

import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("./components/threeJs/ThreeScene"), { ssr: false });

export default function Home() {
  const paysageImagesSection = [
    "assets/images/hero.jpg",
    "assets/images/paysage.jpg",
    "assets/images/hero.jpg",
    "assets/images/paysage.jpg",
    "assets/images/hero.jpg",
    "assets/images/paysage.jpg",
    "assets/images/hero.jpg",
    "assets/images/paysage.jpg",
  ];

  const fourImagesData = [
    {
      title: "Cultural",
      imageSrc: [
        "assets/images/CULTUREL/ORCHIDEE/NC-Edited_ORCHIDEEOrchidee_v01-29.jpg",
        "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-31.jpg",
      ],
    },
    {
      imageSrc: [
        "assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-31.jpg",
        "/assets/images/CULTUREL/ORCHIDEE/NC-Edited_ORCHIDEEOrchidee_v01-29.jpg",
      ],
    },
  ];

  return (
    <main>
      {/* <Hero heroTitle="Title" imageSrc="/assets/images/hero.jpg" /> */}
      <ThreeScene />
      {/* <PaysageImages images={paysageImagesSection} /> */}
      {/* <FourImages items={fourImagesData} /> */}
      {/* <LinesImage /> */}
    </main>
  );
}
