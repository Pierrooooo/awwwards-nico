import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const scrollThreeAnimation = (
  contentRef: React.RefObject<HTMLDivElement>,
  planesConfig: Array<any>,
  setCameraY: React.Dispatch<React.SetStateAction<number>>, 
  setCameraZ?: React.Dispatch<React.SetStateAction<number>>, 
  setIsScrolling?: React.Dispatch<React.SetStateAction<boolean>>,
  setScrollSpeed?: React.Dispatch<React.SetStateAction<number>>
) => {
  if (!contentRef.current || planesConfig.length === 0) return;

  let scrollTimeout: NodeJS.Timeout | null = null;
  let lastScrollY = window.scrollY;

  const spacing = 3;
  const totalHeight = planesConfig.reduce((acc, plane) => acc + plane.height + spacing, 0) - spacing;

  ScrollTrigger.create({
    trigger: contentRef.current,
    start: "top top",
    end: `bottom+=300%`,
    scrub: true,
    pin: true,
    markers: true,
    onUpdate: (self) => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      console.log('scrollDelta', scrollDelta)
      
      lastScrollY = currentScrollY;
    
      const yPosition = -self.progress * totalHeight * 1.5;
      setCameraY(yPosition);
    
      if (setCameraZ) {
        const zPosition = 10 + Math.sin(scrollDelta * 0.05) * (totalHeight * 0.1);
        setCameraZ(zPosition);
      }
    
      if (scrollDelta > 0 && setIsScrolling) {
        setIsScrolling(true);
        if (setScrollSpeed) {
          setScrollSpeed(currentScrollY - lastScrollY);
        }
      }
    
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (setIsScrolling) setIsScrolling(false);
      }, 200);
    }    
  });

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    if (scrollTimeout) clearTimeout(scrollTimeout);
  };
};

export const animatePlanes = (planesConfig: Array<any>) => {
    if (!planesConfig.length) return;

    planesConfig.forEach((plane, index) => {
        if (plane.meshRef?.current) {
            gsap.set(plane.meshRef.current.position, {
                y: -index * 1.5,
                z: 5 + index * 0.5,
                opacity: 0,
            });
        }
    });

    planesConfig.forEach((plane, index) => {
        if (plane.meshRef?.current) {
            gsap.to(plane.meshRef.current.position, {
                delay: index * 0.2,
                y: -index * 2,
                z: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });
        }
    });
};