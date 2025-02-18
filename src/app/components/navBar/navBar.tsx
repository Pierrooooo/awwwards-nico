'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./nav.module.css";
import Link from "next/link";
import CopyToClipboard from "@/app/utils/copyToClipboard";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTestimonialsActive, setIsTestimonialsActive] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = Math.round((scrollTop / documentHeight) * 10000) / 100;
      setScrollPercentage(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const testimonialsSection = document.querySelector('.testimonials');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTestimonialsActive(true);
        } else {
          setIsTestimonialsActive(false);
        }
      },
      { threshold: 0.5 }
    );

    if (testimonialsSection) {
      observer.observe(testimonialsSection);
    }

    return () => {
      if (testimonialsSection) {
        observer.unobserve(testimonialsSection);
      }
    };
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${
        isTestimonialsActive ? styles.active : ""
      }`}
      style={{
        '--scroll-percentage': `${scrollPercentage}%`,
      } as React.CSSProperties}
    >
      <Link href={'/'}>
        <Image 
          src={'/assets/icons/logo_cat.webp'}
          alt=""
          height={0}
          width={0}
          className={styles.image}
          sizes="100vw"
        />
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href={'/'}>Lien 1</Link>
        </li>
        <li>
          <Link href={'/'}>Lien 2</Link>
        </li>
      </ul>
      <div className={styles.phone}>
        <CopyToClipboard type="phone" text="09 79 39 11 01"/>
      </div>

      <button
        className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={styles.burgerMenu}>
        <div className={styles.transis}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul>
          <li>
            <Link href={'/'} onClick={toggleMenu}>Accueil</Link>
          </li>
          <li>
            <Link href={'/gallery'} onClick={toggleMenu}>Galerie</Link>
          </li>
          <li>
            <Link href={'/menu'} onClick={toggleMenu}>Menu</Link>
          </li>
        </ul>
        <div className={styles.burger_infos}>
          <CopyToClipboard type="phone" text="09 79 39 11 01"/>
          <a target='_blank' href="https://www.google.fr/maps/place/La+P'tite+Taverne/@48.9683424,2.1600307,14.36z/data=!4m10!1m2!2m1!1sla+pt'ite+tavern!3m6!1s0x47e661a0d6113b35:0x597b80010c1c8d95!8m2!3d48.9704529!4d2.1806255!15sChBsYSBwJ3RpdGUgdGF2ZXJuWhIiEGxhIHAgdGl0ZSB0YXZlcm6SARFmcmVuY2hfcmVzdGF1cmFudOABAA!16s%2Fg%2F11y9r4ljlz?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D">21 Quai de Seine, 95530 La Frette-sur-Seine</a>
        </div>
      </div>
    </nav>
  );
}
