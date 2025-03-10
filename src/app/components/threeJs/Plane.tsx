"use client";

import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { planeVertexShader } from "./shaders/planeVertexShader";
import { planeFragmentShader } from "./shaders/planeFragmentShader";
import { planeVertexScrollShader } from "./shaders/planeVertexScrollShader";
import { planeFragmentScrollShader } from "./shaders/planeFragmentScrollShader";

interface PlaneProps {
  image: {
    src: string;
    width: number;
    height: number;
  };
  position: [number, number, number];
  width: number;
  height: number;
  isScrolling: boolean;
  scrollSpeed: number;
}

export const Plane = ({ image, position, width, height, isScrolling, scrollSpeed }: PlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, image.src);

  useEffect(() => {
    console.log('isScrolling : ', isScrolling)
    console.log('scrollSpeed : ', scrollSpeed)
  })

  const uniforms = useMemo(() => ({
    uOffsetZ: { value: 0 },
    uPreviousOffsetZ: { value: 0 },
    uTime: { value: 0 },
    uStartTime: { value: 0 },
    uTexture: { value: texture },
    uScrollProgress: { value: 0 },
    uScrollSpeed: { value: scrollSpeed }
  }), [texture]);  

  useEffect(() => {
    uniforms.uScrollProgress.value = isScrolling ? 1.0 : 0.0;
  }, [isScrolling]);

  useFrame(() => {
    uniforms.uTime.value += 0.01;
    uniforms.uScrollSpeed.value = scrollSpeed;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[width, height, 35, 35]} />
      <shaderMaterial
        vertexShader={isScrolling ? planeVertexScrollShader : planeVertexShader}
        fragmentShader={isScrolling ? planeFragmentScrollShader : planeFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
