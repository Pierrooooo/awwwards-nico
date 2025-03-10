"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { scrollThreeAnimation } from "@/app/animations/threejsAnimations";
import { Plane } from "./Plane";
import { CameraController } from "./cameraController";

const Images = [
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_03Galerie-05.jpg", width: 1365, height: 2048 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-31.jpg", width: 2048, height: 1365 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-07.jpg", width: 2048, height: 1365 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-13.jpg", width: 2048, height: 1365 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_03Galerie-05.jpg", width: 1365, height: 2048 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-31.jpg", width: 2048, height: 1365 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-13.jpg", width: 2048, height: 1365 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-07.jpg", width: 2048, height: 1365 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-13.jpg", width: 2048, height: 1365 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_03Galerie-05.jpg", width: 1365, height: 2048 },
  { src: "/assets/images/CULTUREL/PALEON/NC-Edited_02Galerie-31.jpg", width: 2048, height: 1365 },
];

export default function ThreeScene() {
  const [planesConfig, setPlanesConfig] = useState<Array<{
    position: [number, number, number],
    width: number,
    height: number,
    image: typeof Images[0]
  }>>([]);
  const [cameraY, setCameraY] = useState(0);
  const [cameraZ, setCameraZ] = useState(10);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const calculateLayout = () => {
      const scaleFactor = 0.01;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const spacing = 3;
      let currentY = 0;

      return Images.map(image => {
        const aspectRatio = image.width / image.height;
        let width, height;

        if (aspectRatio > 1) {
          width = windowWidth * scaleFactor;
          height = width / aspectRatio;
          if (height > windowHeight * scaleFactor) {
            height = windowHeight * scaleFactor;
            width = height * aspectRatio;
          }
        } else {
          height = windowHeight * scaleFactor;
          width = height * aspectRatio;
          if (width > windowWidth * scaleFactor) {
            width = windowWidth * scaleFactor;
            height = width / aspectRatio;
          }
        }

        const position: [number, number, number] = [0, currentY, 0];
        currentY -= height + spacing;

        return { position, width, height, image };
      });
    };

    const updateLayout = () => setPlanesConfig(calculateLayout());
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Setup animation
  useEffect(() => {
    // enterPlanesAnimation(planesConfig);
    const cleanup = scrollThreeAnimation(
      contentRef,
      planesConfig,
      setCameraY,
      setCameraZ,
      setIsScrolling
    );
    
    return cleanup;
  }, [planesConfig]);

  return (
    <div ref={contentRef} style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <CameraController cameraY={cameraY} cameraZ={cameraZ} />
        {planesConfig.map((config, i) => (
          <Plane key={i} {...config} isScrolling={isScrolling} scrollSpeed={0} />
        ))}
      </Canvas>
    </div>
  );
}