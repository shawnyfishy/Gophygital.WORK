import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Scroll3DModelProps {
  activeMode: 'workplace' | 'building';
}

export const Scroll3DModel: React.FC<Scroll3DModelProps> = ({ activeMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeModeRef = useRef(activeMode);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const scrollRef = useRef(0);
  const frameIdRef = useRef<number>(0);
  const autoRotationRef = useRef(0);

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const clampedScroll = maxScroll > 0 ? scrollY / maxScroll : 0;
      scrollRef.current = clampedScroll;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#FDFCF8', 35, 160);

    // --- Camera Setup (Orthographic for Blueprint look) ---
    const aspect = window.innerWidth / window.innerHeight;
    const d = 14; 
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(35, 35, 35); 
    camera.lookAt(0, 0, 0);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: "high-performance" 
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const workplaceGroup = new THREE.Group();
    const buildingGroup = new THREE.Group();
    mainGroup.add(workplaceGroup);
    mainGroup.add(buildingGroup);

    // --- High-Fidelity Materials ---
    const mats = {
        wall: new THREE.MeshStandardMaterial({ color: 0xF5F5F4, roughness: 0.8 }), 
        wallAccent: new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.7 }), // Vibrant Peach/Amber
        floor: new THREE.MeshStandardMaterial({ color: 0xE7E5E4, roughness: 1 }), 
        desk: new THREE.MeshStandardMaterial({ color: 0xD4A373, roughness: 0.6 }), // Rich Warm Wood
        chair: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 }), // Dark Slate
        monitor: new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.2, metalness: 0.8 }), // Navy Metallic
        screen: new THREE.MeshStandardMaterial({ 
          color: 0x1C1917, 
          emissive: 0xD97706, 
          emissiveIntensity: 0.8 // Brighter glow
        }),
        metal: new THREE.MeshStandardMaterial({ color: 0xCBD5E1, metalness: 0.9, roughness: 0.1 }),
        glass: new THREE.MeshPhysicalMaterial({ 
            color: 0x7DD3FC, // More vibrant Blue
            transmission: 0.8, 
            opacity: 0.4, 
            transparent: true, 
            roughness: 0.1, 
            thickness: 1.2,
            ior: 1.5
        }),
        plant: new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 1 }), // Forest Green
        core: new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.4 }),
    };

    const createBox = (w: number, h: number, d: number, mat: THREE.Material, x=0, y=0, z=0) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        mesh.position.set(x, y + h/2, z);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        return mesh;
    };

    // --- Build Workplace ---
    workplaceGroup.add(createBox(20, 0.4, 16, mats.floor, 0, -0.2, 0));
    workplaceGroup.add(createBox(0.3, 5, 16, mats.wall, -10, 0, 0));
    workplaceGroup.add(createBox(12, 5, 0.3, mats.wall, -4, 0, -8));
    workplaceGroup.add(createBox(4, 5, 0.3, mats.wallAccent, 8, 0, -8));

    const buildDesk = (x: number, z: number) => {
        const desk = new THREE.Group();
        // Legs
        desk.add(createBox(0.08, 0.75, 0.08, mats.metal, x - 1.1, 0, z - 0.6));
        desk.add(createBox(0.08, 0.75, 0.08, mats.metal, x + 1.1, 0, z - 0.6));
        desk.add(createBox(0.08, 0.75, 0.08, mats.metal, x - 1.1, 0, z + 0.6));
        desk.add(createBox(0.08, 0.75, 0.08, mats.metal, x + 1.1, 0, z + 0.6));
        // Surface
        desk.add(createBox(2.4, 0.1, 1.4, mats.desk, x, 0.75, z));
        // Monitor Base
        desk.add(createBox(0.4, 0.05, 0.3, mats.monitor, x, 0.85, z - 0.4));
        // Monitor Neck
        desk.add(createBox(0.1, 0.4, 0.1, mats.monitor, x, 0.85, z - 0.45));
        // Monitor Casing
        desk.add(createBox(0.9, 0.55, 0.06, mats.monitor, x, 1.05, z - 0.4));
        
        // CRITICAL FIX: The screen mesh now has a larger z-offset and smaller thickness
        // to completely eliminate Z-fighting flickering.
        const screenWidth = 0.84;
        const screenHeight = 0.49;
        const screenZ = z - 0.4 + 0.035; // Move well in front of casing center
        desk.add(createBox(screenWidth, screenHeight, 0.005, mats.screen, x, 1.05, screenZ)); 

        // Chair
        desk.add(createBox(0.6, 0.1, 0.6, mats.chair, x, 0.45, z + 0.8)); // Seat
        desk.add(createBox(0.6, 0.8, 0.1, mats.chair, x, 0.45, z + 1.1)); // Back
        desk.add(createBox(0.1, 0.45, 0.1, mats.metal, x, 0, z + 0.8)); // Stem
        
        // Desk Accessory (Tablet or Coffee Mug)
        const accessory = createBox(0.3, 0.02, 0.2, mats.wallAccent, x + 0.7, 0.85, z + 0.2);
        desk.add(accessory);
        
        return desk;
    };

    for(let i=0; i<3; i++) {
        for(let j=0; j<2; j++) {
            workplaceGroup.add(buildDesk(-5 + (i * 5.5), -3 + (j * 5.5)));
        }
    }

    // Potted Plants for Color
    const addPlant = (x: number, z: number) => {
        const pot = createBox(0.5, 0.6, 0.5, mats.core, x, 0, z);
        const bush = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), mats.plant);
        bush.position.set(x, 0.9, z);
        workplaceGroup.add(pot);
        workplaceGroup.add(bush);
    };
    addPlant(-8, 4);
    addPlant(8, -5);

    // IoT Sensors (Glowing Nodes)
    for(let i=0; i<10; i++) {
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.12, 12, 12),
            new THREE.MeshStandardMaterial({ color: 0xD97706, emissive: 0xD97706, emissiveIntensity: 3 })
        );
        sphere.position.set((Math.random()-0.5)*18, 0.1, (Math.random()-0.5)*14);
        workplaceGroup.add(sphere);
    }

    // --- Build Building ---
    buildingGroup.add(createBox(15, 1.8, 15, mats.wall, 0, 0, 0)); // Base
    buildingGroup.add(createBox(6, 28, 6, mats.core, 0, 0, 0)); // Internal Core
    
    for(let i=0; i<9; i++) {
        const h = 2.8;
        const yPos = 1.8 + (i * h);
        buildingGroup.add(createBox(12.5, 0.25, 12.5, mats.floor, 0, yPos, 0)); // Wider plates
        
        // Multi-colored internal "Activity" (lights/furniture)
        const color = i % 2 === 0 ? 0xD97706 : 0x7DD3FC;
        const internalMat = new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 0.5 });
        buildingGroup.add(createBox(3, 0.8, 3, internalMat, (Math.random()-0.5)*6, yPos + 0.3, (Math.random()-0.5)*6));

        // Facade segments with mullions
        buildingGroup.add(createBox(12.4, h - 0.25, 12.4, mats.glass, 0, yPos + 0.25, 0));
        
        // Architectural Detail (Vertical Fins)
        buildingGroup.add(createBox(0.2, h, 0.4, mats.metal, 6.2, yPos, 0));
        buildingGroup.add(createBox(0.2, h, 0.4, mats.metal, -6.2, yPos, 0));
        buildingGroup.add(createBox(0.4, h, 0.2, mats.metal, 0, yPos, 6.2));
        buildingGroup.add(createBox(0.4, h, 0.2, mats.metal, 0, yPos, -6.2));
    }
    
    // Modern Top Section (Crown)
    buildingGroup.add(createBox(9, 4, 9, mats.core, 0, 27, 0)); 
    buildingGroup.add(createBox(1, 6, 1, mats.metal, 0, 31, 0)); // Spire/Antenna

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(25, 50, 40);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xD97706, 2, 50);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);

    const backLight = new THREE.DirectionalLight(0x7DD3FC, 0.6);
    backLight.position.set(-30, 15, -30);
    scene.add(backLight);

    const clock = new THREE.Clock();
    let currentScroll = 0;
    let currentModeVal = activeMode === 'workplace' ? 0 : 1;

    // --- Animation Loop ---
    const animate = () => {
      if (!rendererRef.current) return;
      frameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      
      currentScroll += (scrollRef.current - currentScroll) * 4 * delta; 
      const targetMode = activeModeRef.current === 'workplace' ? 0 : 1;
      currentModeVal += (targetMode - currentModeVal) * 5 * delta;

      autoRotationRef.current += 0.05 * delta;

      const zoomLevel = THREE.MathUtils.lerp(1.2, 3.4, Math.pow(currentScroll, 0.5));
      camera.zoom = THREE.MathUtils.lerp(camera.zoom, zoomLevel, 0.1);
      camera.updateProjectionMatrix();

      mainGroup.rotation.y = (Math.PI / 4) + (currentScroll * Math.PI) + (autoRotationRef.current * (1 - currentScroll));
      mainGroup.position.y = THREE.MathUtils.lerp(0, activeModeRef.current === 'building' ? -18 : 2, currentScroll);

      workplaceGroup.scale.setScalar(1 - currentModeVal);
      buildingGroup.scale.setScalar(currentModeVal);
      
      workplaceGroup.visible = (1 - currentModeVal) > 0.001;
      buildingGroup.visible = currentModeVal > 0.001;
      
      workplaceGroup.position.y = (currentModeVal) * 30;
      buildingGroup.position.y = (1 - currentModeVal) * -30;

      rendererRef.current.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!rendererRef.current) return;
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -d * aspect;
      camera.right = d * aspect;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
      rendererRef.current?.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-70 select-none" />;
};