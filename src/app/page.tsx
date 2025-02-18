'use client';

import Hero from "./components/hero/hero";
import PaysageImages from "./components/paysageImages/section";

export default function Home() {

  const paysageImagesSection = [
    'assets/images/hero.jpg',
    'assets/images/paysage.jpg',
    'assets/images/hero.jpg',
    'assets/images/paysage.jpg',
    'assets/images/hero.jpg',
    'assets/images/paysage.jpg',
    'assets/images/hero.jpg',
    'assets/images/paysage.jpg',
  ]

  return (
    <main>

      <Hero heroTitle="Title" imageSrc="/assets/images/hero.jpg" />
      <PaysageImages images={paysageImagesSection} />
      
    </main>
  );
}
