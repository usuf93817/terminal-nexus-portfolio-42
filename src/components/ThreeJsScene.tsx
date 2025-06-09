
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const ThreeJsScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create geometries
    const geometries = [];
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x4ec9b0, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x569cd6, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xc586c0, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xdcdcaa, wireframe: true })
    ];

    // Create floating geometric shapes
    for (let i = 0; i < 20; i++) {
      const geometry = Math.random() > 0.5 
        ? new THREE.BoxGeometry(0.5, 0.5, 0.5)
        : new THREE.SphereGeometry(0.3, 8, 6);
      
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      scene.add(mesh);
      geometries.push(mesh);

      // GSAP animation for each geometry
      gsap.to(mesh.rotation, {
        duration: 3 + Math.random() * 2,
        x: Math.PI * 2,
        y: Math.PI * 2,
        z: Math.PI * 2,
        repeat: -1,
        ease: "none"
      });

      gsap.to(mesh.position, {
        duration: 4 + Math.random() * 4,
        y: mesh.position.y + (Math.random() - 0.5) * 5,
        x: mesh.position.x + (Math.random() - 0.5) * 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    camera.position.z = 15;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Camera movement based on mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

export default ThreeJsScene;
