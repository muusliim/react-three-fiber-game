import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";
import { boxGeometry } from "../geometries/Geometry";
import { floor2Material, obstacleMaterial } from "../materials/Materials";

export function BlockSpinner({ position = [0, 0, 0] }) {
	const spinnerRef = useRef();
	const [speed] = useState(
		() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
	);
	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		const rotation = new THREE.Quaternion();
		rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));

		if (spinnerRef.current)
			spinnerRef.current.setNextKinematicRotation(rotation);
	});
	return (
		<>
			<group position={position}>
				<mesh
					geometry={boxGeometry}
					material={floor2Material}
					position={[0, -0.1, 0]}
					scale={[4, 0.2, 4]}
					receiveShadow
				/>
				<RigidBody
					ref={spinnerRef}
					type="kinematicPosition"
					position={[0, 0.3, 0]}
					restitution={0.2}
					friction={0}
				>
					<mesh
						material={obstacleMaterial}
						geometry={boxGeometry}
						scale={[3.5, 0.3, 0.3]}
						castShadow
						receiveShadow
					/>
				</RigidBody>
			</group>
		</>
	);
}
