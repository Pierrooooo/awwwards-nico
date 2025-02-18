"use client";

import { useEffect } from 'react';
import { ReactNode } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';

interface SmoothScrollingProps {
  children: ReactNode;
}

function SmoothScrolling({ children }: SmoothScrollingProps) {
  const lenis = useLenis();

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
          document.body.classList.add('scroll_down');
          document.body.classList.remove('scroll_up');
        } else if (currentScrollY < lastScrollY) {
          document.body.classList.add('scroll_up');
          document.body.classList.remove('scroll_down');
        }

        lastScrollY = currentScrollY;
      }
    };

    if (lenis) {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
    };
  }, [lenis]);

  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href') || '';

      if (href.startsWith('#') && lenis) {
        lenis.scrollTo(href);
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchorLinks.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
