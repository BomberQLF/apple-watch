import { useCallback, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import gsap from 'gsap';
import { Model3D } from './components/Model3D';
import './App.css';

type WatchColor = {
  name: string;
  hex: `#${string}`;
};

const INITIAL_CAMERA_POSITION: [number, number, number] = [0, 0, 0.5];
const INITIAL_TARGET: [number, number, number] = [0, 0, 0];

function App() {
  const [color, setColor] = useState<WatchColor['hex']>('#000000');
  const [isRotating, setIsRotating] = useState(true);

  // Ref explicitement typée pour éviter any et sécuriser l'accès aux contrôles
  const orbitControlsRef = useRef<OrbitControlsImpl | null>(null);

  const handleReset = useCallback(() => {
    const controls = orbitControlsRef.current;
    if (!controls) return;

    const camera = controls.object;

    gsap.to(camera.position, {
      x: INITIAL_CAMERA_POSITION[0],
      y: INITIAL_CAMERA_POSITION[1],
      z: INITIAL_CAMERA_POSITION[2],
      duration: 1.2,
      ease: 'power2.inOut',
      // On force update pendant le tween pour garder la caméra/target synchronisées
      onUpdate: () => controls.update(),
    });

    gsap.to(controls.target, {
      x: INITIAL_TARGET[0],
      y: INITIAL_TARGET[1],
      z: INITIAL_TARGET[2],
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => controls.update(),
    });
  }, []);

  const colors: readonly WatchColor[] = [
    { name: 'Noir', hex: '#000000' },
    { name: 'Argent', hex: '#e8e8e8' },
    { name: 'Or', hex: '#d4af37' },
    { name: 'Bleu', hex: '#0071e3' },
  ];

  return (
    <div className="app">
      <Canvas dpr={[1, 1.5]}>
        <color attach="background" args={['#0a0a0a']} />
        <PerspectiveCamera makeDefault position={INITIAL_CAMERA_POSITION} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <spotLight position={[5, 5, 5]} angle={0.3} intensity={0.5} />
        <Environment preset="city" />
        <Model3D color={color} />

        <OrbitControls
          ref={orbitControlsRef}
          autoRotate={isRotating}
          enableZoom={false}
          enableDamping
          dampingFactor={0.06}
        />
      </Canvas>

      <div className="overlay-controls">
        <div className="top-section">
          <h1>Apple Watch New Era</h1>
        </div>

        <div className="color-selector">
          {colors.map((c) => (
            <button
              key={c.hex}
              className={`color-dot ${color === c.hex ? 'active' : ''}`}
              style={{ backgroundColor: c.hex }}
              onClick={() => setColor(c.hex)}
              title={c.name}
              aria-label={c.name}
            />
          ))}
        </div>

        <div className="bottom-section">
          <button
            className={`control-btn rotation-btn ${isRotating ? 'active' : ''}`}
            onClick={() => setIsRotating((prev) => !prev)}
            title="Rotation automatique"
            aria-label="Rotation automatique"
          >
            Auto Rotate
          </button>

          <button
            className="control-btn reset-btn"
            onClick={handleReset}
            title="Recentrer"
            aria-label="Recentrer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;