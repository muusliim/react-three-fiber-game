import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { boxGeometry } from "../geometries/Geometry";
import { floor2Material, obstacleMaterial } from "../materials/Materials";

export function BlockHorizontalLift({ position = [0, 0, 0] }) {
	const liftRef = useRef();
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		liftRef.current?.setNextKinematicTranslation({
			x: position[0] + Math.sin(time + timeOffset) * 1.25,
			y: position[1] + 0.75,
			z: position[2],
		});
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
					ref={liftRef}
					type="kinematicPosition"
					position={[0, 0.3, 0]}
					restitution={0.2}
					friction={0}
				>
					<mesh
						material={obstacleMaterial}
						geometry={boxGeometry}
						scale={[1.5, 1.5, 0.3]}
						castShadow
						receiveShadow
					/>
				</RigidBody>
			</group>
		</>
	);
}
