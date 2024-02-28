// src/ThreeScene.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const ThreeScene: React.FC = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const renderer = new THREE.WebGLRenderer();
    useEffect(() => {
        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Add a directional light to the scene
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Renderer
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.update();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(new THREE.Color(0xeeeeee));
        // Append renderer to the DOM
        console.log(sceneRef, renderer.domElement)
        if (sceneRef.current && !sceneRef.current.contains(renderer.domElement)) {
            sceneRef.current.appendChild(renderer.domElement);
        }

        // Cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the cube
            cube.rotation.x += 0.01;
            controls.update();

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        // return () => {
        //     // Clean up resources (if needed)
        // };
    }, []);

    return <div id="canvas-div" ref={sceneRef} />;
};

export default ThreeScene;
