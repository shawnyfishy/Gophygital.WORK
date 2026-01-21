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
  const autoRotationRef = useRef(0); // Track accumulated auto-rotation

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // CLAMP SCROLL to prevent negative values (Safari bounce) causing NaN in Math.pow
      const clampedScroll = maxScroll > 0 ? scrollY / maxScroll : 0;
      scrollRef.current = Math.max(0, Math.min(1, clampedScroll));
    };
    // Initial call
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#FDFCF8', 20, 80);

    // Isometric Camera Setup
    const aspect = window.innerWidth / window.innerHeight;
    // Balanced Field of View: d=12 allows seeing context without being too far
    const d = 12; 
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    
    // High angle isometric
    camera.position.set(20, 20, 20); 
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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

    // --- Extended Materials Palette ---
    const mats = {
        wall: new THREE.MeshStandardMaterial({ color: 0xEAE5D9, roughness: 0.9 }), 
        floor: new THREE.MeshStandardMaterial({ color: 0xD4C5B0, roughness: 1.0 }), 
        carpet: new THREE.MeshStandardMaterial({ color: 0x8C7853, roughness: 1.0 }),
        concrete: new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.7 }),
        metal: new THREE.MeshStandardMaterial({ color: 0x4b5563, roughness: 0.4, metalness: 0.8 }),
        silver: new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.3, metalness: 0.6 }),
        plasticBlack: new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 }),
        plasticWhite: new THREE.MeshStandardMaterial({ color: 0xf9fafb, roughness: 0.5 }),
        accent: new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.8 }), 
        accentDark: new THREE.MeshStandardMaterial({ color: 0xB45309, roughness: 0.8 }),
        glass: new THREE.MeshPhysicalMaterial({ 
            color: 0xA7C7E7, 
            transmission: 0.4,
            opacity: 0.5,
            transparent: true,
            roughness: 0.05,
            metalness: 0.1,
            clearcoat: 1.0,
            side: THREE.DoubleSide
        }),
        green: new THREE.MeshStandardMaterial({ color: 0x4d7c0f, roughness: 0.8 }),
        wood: new THREE.MeshStandardMaterial({ color: 0xA08865, roughness: 0.8 }),
        screen: new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.2, metalness: 0.5, emissive: 0x111111, emissiveIntensity: 0.2 }),
    };

    // --- Geometry Generators (High Detail) ---

    // 1. Primitive Box Helper
    const createBox = (w: number, h: number, d: number, mat: THREE.Material, x=0, y=0, z=0, castShadow=true) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        mesh.position.set(x, y + h/2, z);
        if (castShadow) mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    };

    // 2. Detailed Office Chair
    const createChair = () => {
        const group = new THREE.Group();
        // Base (Star)
        const baseGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8);
        const leg1 = new THREE.Mesh(baseGeo, mats.metal); leg1.rotation.z = Math.PI/2; leg1.scale.y = 2.5;
        const leg2 = new THREE.Mesh(baseGeo, mats.metal); leg2.rotation.x = Math.PI/2; leg2.scale.y = 2.5;
        group.add(leg1); group.add(leg2);
        
        // Stem
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8), mats.metal);
        stem.position.y = 0.2;
        group.add(stem);

        // Seat
        const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.5), mats.accentDark);
        seat.position.y = 0.45;
        seat.castShadow = true;
        group.add(seat);

        // Back
        const back = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.05), mats.accentDark);
        back.position.set(0, 0.75, 0.22);
        back.castShadow = true;
        group.add(back);

        // Connector
        const conn = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.2), mats.metal);
        conn.position.set(0, 0.5, 0.1);
        group.add(conn);

        return group;
    };

    // 3. Detailed Monitor
    const createMonitor = () => {
        const group = new THREE.Group();
        // Screen
        const screen = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.02), mats.plasticBlack);
        screen.position.y = 0.3;
        group.add(screen);
        // Display Area
        const display = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.31), mats.screen);
        display.position.set(0, 0.3, 0.011);
        group.add(display);
        // Stand
        const standV = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.02), mats.plasticBlack);
        standV.position.set(0, 0.15, -0.05);
        group.add(standV);
        const standH = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.02, 0.15), mats.plasticBlack);
        standH.position.set(0, 0.01, -0.05);
        group.add(standH);
        return group;
    };

    // 4. Laptop
    const createLaptop = () => {
        const group = new THREE.Group();
        // Base
        const base = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.01, 0.25), mats.silver);
        group.add(base);
        // Screen Lid
        const lid = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.01, 0.25), mats.silver);
        lid.position.set(0, 0.12, -0.12);
        lid.rotation.x = Math.PI / 3; // Open angle
        group.add(lid);
        // Screen
        const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.2), mats.screen);
        screen.position.set(0, 0.12, -0.115);
        screen.rotation.x = Math.PI / 3;
        group.add(screen);
        return group;
    };

    // 5. Desk Workstation
    const createWorkstation = () => {
        const group = new THREE.Group();
        
        // Desk
        const top = createBox(1.4, 0.05, 0.7, mats.wood, 0, 0.7, 0);
        group.add(top);
        
        // Legs (Metal loops)
        const legGeo = new THREE.BoxGeometry(0.04, 0.7, 0.65);
        const legL = new THREE.Mesh(legGeo, mats.metal); legL.position.set(-0.65, 0.35, 0); group.add(legL);
        const legR = new THREE.Mesh(legGeo, mats.metal); legR.position.set(0.65, 0.35, 0); group.add(legR);

        // Tech Setup
        const monitor1 = createMonitor();
        monitor1.position.set(0, 0.73, -0.15);
        group.add(monitor1);

        const laptop = createLaptop();
        laptop.position.set(0.3, 0.73, 0.15);
        laptop.rotation.y = -0.2;
        group.add(laptop);

        // Keyboard & Mouse
        const kb = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.01, 0.12), mats.plasticWhite);
        kb.position.set(-0.1, 0.73, 0.15);
        group.add(kb);
        const mouse = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 0.08), mats.plasticWhite);
        mouse.position.set(0.15, 0.73, 0.15);
        group.add(mouse);

        // Chair
        const chair = createChair();
        chair.position.set(0, 0, 0.6);
        chair.rotation.y = Math.PI + (Math.random() * 0.4 - 0.2); // Random swivel
        group.add(chair);

        return group;
    };

    // 6. Plant
    const createPlant = () => {
        const group = new THREE.Group();
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.2, 0.4, 12), mats.plasticWhite);
        pot.position.y = 0.2;
        pot.castShadow = true;
        group.add(pot);
        
        const soil = new THREE.Mesh(new THREE.CircleGeometry(0.22, 12), mats.carpet);
        soil.rotation.x = -Math.PI/2;
        soil.position.y = 0.38;
        group.add(soil);

        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 1.2), mats.wood);
        trunk.position.y = 0.8;
        group.add(trunk);

        // Leaves
        const leafGeo = new THREE.SphereGeometry(0.4, 4, 4);
        leafGeo.scale(1, 0.3, 1);
        const leaf1 = new THREE.Mesh(leafGeo, mats.green); leaf1.position.y = 1.3; group.add(leaf1);
        const leaf2 = new THREE.Mesh(leafGeo, mats.green); leaf2.position.set(0.2, 1.1, 0); group.add(leaf2);
        const leaf3 = new THREE.Mesh(leafGeo, mats.green); leaf3.position.set(-0.2, 1.0, 0.2); group.add(leaf3);
        
        return group;
    };

    // 7. HVAC Unit
    const createHVAC = () => {
        const group = new THREE.Group();
        // Main Box
        const unit = createBox(2, 1.2, 3, mats.metal, 0, 0, 0);
        group.add(unit);
        
        // Fan housings
        const fanCyl = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 16);
        const fan1 = new THREE.Mesh(fanCyl, mats.plasticBlack); fan1.position.set(0, 1.2, 0.7); group.add(fan1);
        const fan2 = new THREE.Mesh(fanCyl, mats.plasticBlack); fan2.position.set(0, 1.2, -0.7); group.add(fan2);

        // Vents
        const vent = createBox(2.1, 0.4, 2.5, mats.metal, 0, 0.8, 0, false);
        group.add(vent);

        // Grill texture simulated by thin strips
        for(let i=0; i<5; i++) {
             group.add(createBox(0.1, 1.1, 0.05, mats.plasticBlack, 1.01, 0, -1 + (i*0.5)));
        }
        return group;
    };


    // --- BUILDING WORKPLACE SCENE ---
    
    // Floor Base
    workplaceGroup.add(createBox(16, 0.5, 12, mats.floor, 0, -0.5, 0));
    workplaceGroup.add(createBox(16, 0.1, 12, mats.carpet, 0, 0.01, 0));

    // Walls (Cutaway)
    workplaceGroup.add(createBox(0.5, 2.5, 12, mats.wall, -7.75, 0, 0)); // Left Wall
    workplaceGroup.add(createBox(16, 2.5, 0.5, mats.wall, 0, 0, -5.75)); // Back Wall

    // Meeting Room (Glass Box)
    const mrGroup = new THREE.Group();
    mrGroup.position.set(4, 0, -2);
    // Glass Walls
    mrGroup.add(createBox(0.1, 2.5, 6, mats.glass, -3, 0, 0, false)); // Side
    mrGroup.add(createBox(6, 2.5, 0.1, mats.glass, 0, 0, 3, false)); // Front
    // Table
    mrGroup.add(createBox(4, 0.8, 2, mats.wood, 0, 0, 0));
    // Chairs
    for(let i=0; i<3; i++) {
        const c1 = createChair(); c1.position.set(-1 + i, 0, -1.5); c1.rotation.y = 0.2; mrGroup.add(c1);
        const c2 = createChair(); c2.position.set(-1 + i, 0, 1.5); c2.rotation.y = Math.PI - 0.2; mrGroup.add(c2);
    }
    // Screen on wall
    mrGroup.add(createBox(2, 1.2, 0.1, mats.plasticBlack, 0, 1.5, -3.8));
    mrGroup.add(createBox(1.8, 1.0, 0.11, mats.screen, 0, 1.5, -3.8));
    workplaceGroup.add(mrGroup);

    // Open Office Desks
    for (let x = -1; x <= 1; x++) {
        for (let z = 0; z <= 1; z++) {
            const ws = createWorkstation();
            ws.position.set(-4 + (x * 1.6), 0, 0 + (z * 2.5));
            // Add partition
            workplaceGroup.add(createBox(1.4, 1.2, 0.05, mats.accent, -4 + (x * 1.6), 0, -0.4 + (z * 2.5)));
            workplaceGroup.add(ws);
        }
    }

    // Lounge / Reception
    workplaceGroup.add(createBox(3, 1.0, 0.8, mats.concrete, 5, 0, 4)); // Front Desk
    workplaceGroup.add(createPlant());
    workplaceGroup.children[workplaceGroup.children.length-1].position.set(7, 0, 5);
    workplaceGroup.add(createPlant());
    workplaceGroup.children[workplaceGroup.children.length-1].position.set(-7, 0, 4);

    // --- BUILDING EXTERIOR SCENE ---
    
    // Core structure
    buildingGroup.add(createBox(3, 12, 3, mats.concrete, 0, 5, 0)); // Elevator Core

    // Floors
    for(let i=0; i<5; i++) {
        const y = i * 2.5;
        // Slab
        buildingGroup.add(createBox(10, 0.3, 10, mats.floor, 0, y, 0));
        // Glass Curtain (Translucent)
        const glass = createBox(9.8, 2.2, 9.8, mats.glass, 0, y + 1.25, 0, false);
        buildingGroup.add(glass);
        
        // Columns
        buildingGroup.add(createBox(0.4, 2.5, 0.4, mats.concrete, 4.5, y, 4.5));
        buildingGroup.add(createBox(0.4, 2.5, 0.4, mats.concrete, -4.5, y, 4.5));
        buildingGroup.add(createBox(0.4, 2.5, 0.4, mats.concrete, 4.5, y, -4.5));
        buildingGroup.add(createBox(0.4, 2.5, 0.4, mats.concrete, -4.5, y, -4.5));

        // Tiny furniture for scale inside
        if (i > 0 && i < 4) {
             const desk = createBox(1.5, 0.1, 0.8, mats.wood, 2, y + 0.5, 2);
             buildingGroup.add(desk);
             const chair = createBox(0.4, 0.5, 0.4, mats.plasticBlack, 2, y + 0.3, 2.8);
             buildingGroup.add(chair);
        }
    }

    // Roof Details
    const hvac1 = createHVAC(); hvac1.position.set(2, 12.5, 2); buildingGroup.add(hvac1);
    const hvac2 = createHVAC(); hvac2.position.set(-2, 12.5, -2); hvac2.rotation.y = Math.PI/2; buildingGroup.add(hvac2);
    
    // Piping
    buildingGroup.add(createBox(8, 0.2, 0.2, mats.metal, 0, 12.4, 0));
    buildingGroup.add(createBox(0.2, 0.2, 8, mats.metal, 0, 12.4, 0));

    // Base Landscaping
    buildingGroup.add(createBox(14, 0.2, 14, mats.concrete, 0, -0.2, 0));
    const tree1 = createPlant(); tree1.scale.setScalar(2); tree1.position.set(6, 0, 6); buildingGroup.add(tree1);
    const tree2 = createPlant(); tree2.scale.setScalar(2); tree2.position.set(-6, 0, 6); buildingGroup.add(tree2);


    // --- Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff0dd, 2.0);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xcfd8dc, 0.8);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    
    let currentScroll = scrollRef.current;
    let currentModeVal = activeMode === 'workplace' ? 0 : 1; 

    const animate = () => {
      // Safety check if renderer or container was removed
      if (!rendererRef.current || !containerRef.current) return;

      frameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth scroll lerp
      currentScroll += (scrollRef.current - currentScroll) * 4 * delta; 
      
      // Safety clamp
      if (isNaN(currentScroll)) currentScroll = 0;
      
      // Smooth mode transition
      const targetMode = activeModeRef.current === 'workplace' ? 0 : 1;
      currentModeVal += (targetMode - currentModeVal) * 3 * delta;

      // Auto-rotation logic: Spins when at top (Hero), stops as we scroll to focus on details
      // Speed 0.2 rad/s at top, 0 at 30% scroll
      const spinSpeed = Math.max(0, 0.2 * (1 - currentScroll * 3)); 
      autoRotationRef.current += spinSpeed * delta;

      // --- 1. Deep Zoom Logic ---
      // Balanced Zoom: Starts at 1.3 (Slightly Zoomed In Hero) and zooms to 3.5 (Detailed) at bottom of scroll.
      const zoomProgress = Math.pow(Math.abs(currentScroll), 0.8); 
      const targetZoom = THREE.MathUtils.lerp(1.3, 3.5, zoomProgress); 
      
      if (!isNaN(targetZoom)) {
          camera.zoom = THREE.MathUtils.lerp(camera.zoom, targetZoom, 0.1);
          camera.updateProjectionMatrix();
      }

      // --- 2. Panning / Scanning Logic ---
      // As we zoom in, we want to pan across the details.
      // Workplace: Scan from center to meeting room/desks
      // Building: Scan from bottom to top floors
      
      let targetPanX = 0;
      let targetPanY = 0;

      if (activeModeRef.current === 'workplace') {
          // Pan from (0,0) to (-3, 2) to see details
          targetPanX = THREE.MathUtils.lerp(0, -3, currentScroll); 
          targetPanY = THREE.MathUtils.lerp(0, 2, currentScroll);
      } else {
          // Building: Pan from bottom (-2) to top roof (-6) - moving group down
          targetPanY = THREE.MathUtils.lerp(0, -6, currentScroll); 
          targetPanX = THREE.MathUtils.lerp(0, 2, currentScroll); 
      }

      // Apply Pan
      mainGroup.position.x += (targetPanX - mainGroup.position.x) * 2 * delta;
      mainGroup.position.y += (targetPanY - mainGroup.position.y) * 2 * delta;

      // --- 3. Rotation ---
      // Base rotation (45 deg) + Auto-Spin (hero) + Scroll-driven rotation (story)
      // This ensures it spins on hero, but locks into the storytelling angles as you scroll down
      mainGroup.rotation.y = (Math.PI / 4) + autoRotationRef.current + (currentScroll * Math.PI * 0.5);

      // --- 4. Visibility Switching ---
      const wpScale = 1 - currentModeVal;
      workplaceGroup.scale.setScalar(wpScale);
      workplaceGroup.visible = wpScale > 0.01;
      
      const bScale = currentModeVal;
      buildingGroup.scale.setScalar(bScale);
      buildingGroup.visible = bScale > 0.01;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const aspect = window.innerWidth / window.innerHeight;
      const d = 12; // Matched 'd' to new balanced value
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
      
      if (rendererRef.current) {
        // Dispose resources to prevent memory leaks and WebGL context loss errors
        rendererRef.current.dispose();
        // Traverse and dispose geometries/materials if needed
        mainGroup.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
                obj.geometry.dispose();
            }
        });
        
        if (containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
            containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};