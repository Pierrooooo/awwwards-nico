'use client';

import { useState, useEffect } from 'react';
import Footer from '../components/footer/footer';
import Hero from '../components/hero/hero';
import NavBar from '../components/navBar/navBar';
import styles from './page.module.css';

export default function FourOhFour() {
  return (
    <main>
      <NavBar />
      <Hero heroTitle="Error 404" imageSrc="/assets/images/hero.jpg" />
      <Footer />
    </main>
  );
}
