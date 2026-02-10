import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import { Model3D } from './components/Model3D';
import gsap from 'gsap';
import './App.css';

function App() {
  const [color, setColor] = useState('#000000');
  const [isRotating, setIsRotating] = useState(true);
  const orbitControlsRef = useRef<any>(null);

  const handleReset = () => {
    if (orbitControlsRef.current && orbitControlsRef.current.object) {
      const controls = orbitControlsRef.current;
      const camera = controls.object;
      
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 0.5,
        duration: 1.5,
        ease: 'power2.inOut'
      });
      
      gsap.to(controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      });
    }
  };

  const colors = [
    { name: 'Noir', hex: '#000000' },
    { name: 'Argent', hex: '#e8e8e8' },
    { name: 'Or', hex: '#d4af37' },
    { name: 'Bleu', hex: '#0071e3' },
  ];

  return (
    <div className="app">
      <Canvas>
        <color attach="background" args={['#0a0a0a']} />
        <PerspectiveCamera makeDefault position={[0, 0, 0.5]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <spotLight position={[5, 5, 5]} angle={0.3} intensity={0.5} />
        <Environment preset="city" />
        <Model3D color={color} />
        <OrbitControls 
          ref={orbitControlsRef} 
          autoRotate={isRotating}
          enableZoom={false}
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
            onClick={() => setIsRotating(!isRotating)}
            title="Rotation automatique"
            aria-label="Rotation automatique"
          >
            Auto
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
