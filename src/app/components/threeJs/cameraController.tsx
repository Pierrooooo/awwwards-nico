"use client";

import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

type CameraControllerProps = {
  cameraY: number;
  cameraZ: number;
};

export const CameraController = ({ cameraY, cameraZ }: CameraControllerProps) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.y += (cameraY - camera.position.y) * 0.1;
    camera.position.z += (cameraZ - camera.position.z) * 0.05;
    camera.updateProjectionMatrix();
  });

  return null;
};