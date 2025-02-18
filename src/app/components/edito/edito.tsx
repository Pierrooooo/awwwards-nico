'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import styles from './edito.module.css';
import { slideDown, scrollReveal } from '@/app/animations/animationsgsap';

interface EditoProps {
    title: string;
    imageSrc: string;
    para: string;
    para_2?: string;
    para_3?: string;
    invert: boolean;
}

export default function Edito({ }: EditoProps): JSX.Element {


  return (
    <section className={`section_edito container`}>

    </section>
  );
}
