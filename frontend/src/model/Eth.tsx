/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 public/eth.gltf -ts
*/

import * as THREE from "three"
import React, { useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import { useFrame } from "@react-three/fiber"
//@ts-ignore

type GLTFResult = GLTF & {
	nodes: {
		Plane001_Plane002: THREE.Mesh
		Plane_Plane001: THREE.Mesh
	}
	materials: {
		stone: THREE.MeshStandardMaterial
	}
}

export function Model(props: JSX.IntrinsicElements["group"]) {
	const { nodes, materials } = useGLTF("/eth.gltf") as unknown as GLTFResult
    const [isHovered, setIsHovered] = useState(false)
    const ref = useRef<THREE.Mesh>(null!)
    useFrame((state, delta) => (ref.current.rotation.z += delta))

	return (
		<group {...props} dispose={null}>
			<mesh
                ref={ref}
				castShadow
				receiveShadow
				geometry={nodes.Plane001_Plane002.geometry}
				rotation={[Math.PI / 2, 0, 0]}
                onPointerOver={(e) => {
                    
                    setIsHovered(true)
                }}
                onPointerOut={() => setIsHovered(false)}
                scale={isHovered ? 1.1 : 1}
			>
                <meshStandardMaterial
                    color='#caccce'
                    roughness={0.6}
					metalness={0.7}
                />
            </mesh>
			<mesh
                ref={ref}
				castShadow
				receiveShadow
				geometry={nodes.Plane_Plane001.geometry}
				rotation={[Math.PI / 2, 0, 0]}
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
                scale={isHovered ? 1.1 : 1}
			>
                <meshStandardMaterial
                    color='#caccce'
                    roughness={0.6}
					metalness={0.7}
                />``
            </mesh>
		</group>
	)
}

useGLTF.preload("/eth.gltf")