import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const scrollThreeAnimation = (
    contentRef: React.RefObject<HTMLDivElement>,
    planesConfig: Array<any>,
    setCameraY: React.Dispatch<React.SetStateAction<number>>, 
    setCameraZ?: React.Dispatch<React.SetStateAction<number>>, 
    setIsScrolling?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (!contentRef.current || planesConfig.length === 0) return;

    let scrollTimeout: NodeJS.Timeout | null = null;

    const spacing = 3;
    const totalHeight = planesConfig.reduce((acc, plane) => acc + plane.height + spacing, 0) - spacing;

    planesConfig.forEach((plane, index) => {
        if (plane.meshRef?.current) {
            gsap.set(plane.meshRef.current.position, {
                y: -index * 1.5,
                z: 5 + index * 0.5,
                opacity: 0,
            });
        }
    });

    ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top top",
        end: `bottom+=100%`,
        scrub: true,
        pin: true,
        markers: true,
        onUpdate: (self) => {
            const progress = self.progress;
            const yPosition = -progress * totalHeight * 2;
            setCameraY(yPosition);

            if (setCameraZ) {
                const zPosition = 10 + (progress * totalHeight * 0.1);
                setCameraZ(zPosition);
            }

            setIsScrolling?.(true);
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => setIsScrolling?.(false), 200);

            planesConfig.forEach((plane, index) => {
                if (plane.meshRef?.current) {
                    gsap.to(plane.meshRef.current.position, {
                        y: -index * (1 - progress) * 2,
                        z: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
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
