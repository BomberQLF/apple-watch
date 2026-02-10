import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, MeshStandardMaterial } from 'three';

interface Model3DProps {
  color: string;
}

export function Model3D({ color }: Model3DProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/watch.gltf');

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child: any) => {
        if (child.isMesh && child.material) {
          if (child.material instanceof MeshStandardMaterial) {
            child.material.color.set(color);
          }
        }
      });
    }
  }, [color]);

  return <primitive ref={groupRef} object={scene.clone()} scale={2} rotation={[0, -0.8, 0]} />;
}
