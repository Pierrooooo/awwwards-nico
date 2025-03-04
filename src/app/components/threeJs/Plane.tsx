"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three'
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
}

export const Plane = ({ image, position, width, height, isScrolling }: PlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, image.src);
  const [isAnimating, setIsAnimating] = useState(false);

  const uniforms = useRef({
    uOffsetZ: { value: 0 },
    uPreviousOffsetZ: { value: 0 },
    uTime: { value: 0 },
    uStartTime: { value: 0 },
    uTexture: { value: texture },
    uScrollProgress: { value: 0 },
  });

  const clock = new THREE.Clock();

  const handleClickPlane = () => {
    // if (isAnimating) return;

    uniforms.current.uPreviousOffsetZ.value = uniforms.current.uOffsetZ.value;
    const targetOffset = uniforms.current.uOffsetZ.value === 0 ? -10 : uniforms.current.uOffsetZ.value * -1;
    
    uniforms.current.uOffsetZ.value = targetOffset;
    uniforms.current.uStartTime.value = clock.getElapsedTime();
    // setIsAnimating(true);

    // setTimeout(() => setIsAnimating(false), 1000);
  };

  useFrame(() => {
    uniforms.current.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClickPlane}
    >
        <planeGeometry args={[width, height, 35, 35]} />
        <shaderMaterial
            vertexShader={isScrolling ? planeVertexScrollShader : planeVertexShader}
            fragmentShader={isScrolling ? planeFragmentScrollShader : planeFragmentShader}
            uniforms={uniforms.current}
        />

    </mesh>
  );
};