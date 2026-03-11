import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import {
  Box3,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from 'three';

interface Model3DProps {
  color: `#${string}`;
}

export function Model3D({ color }: Model3DProps) {
  const groupRef = useRef<Group | null>(null);
  const { scene } = useGLTF('/models/watch.gltf');

  const localScene = useMemo<Object3D>(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    const box = new Box3().setFromObject(localScene);
    const center = new Vector3();
    box.getCenter(center);
    localScene.position.sub(center);
  }, [localScene]);

  useEffect(() => {
    localScene.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (mat instanceof MeshStandardMaterial) {
          mat.color.set(color);
          mat.needsUpdate = true;
        }
      });
    });
  }, [color, localScene]);

  return (
    <group ref={groupRef}>
      <primitive object={localScene} scale={2} rotation={[0, -0.8, 0]} />
    </group>
  );
}

useGLTF.preload('/models/watch.gltf');