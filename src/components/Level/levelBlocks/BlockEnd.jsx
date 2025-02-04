import { Text, useGLTF } from "@react-three/drei";
import { boxGeometry } from "../geometries/Geometry";
import { floorMaterial } from "../materials/Materials";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

export function BlockEnd({ position = [0, 0, 0] }) {
	const reward = useGLTF("./reward.glb");
	reward.scene.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true;
		}
	});

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		reward.scene.rotation.y = time * 0.5;
	});

	return (
		/* sTART POSITION Floor */
		<group position={position}>
			<Text position={[0.0, 1.85, 2]} color="#4e4ebc" scale={1} font="./fonts/bebas-neue.woff">
				FINISH
				<meshBasicMaterial toneMapped={false} />
			</Text>
			<mesh
				geometry={boxGeometry}
				material={floorMaterial}
				position={[0, 0, 0]}
				scale={[4, 0.2, 4]}
				receiveShadow
			/>
			<RigidBody
				type="fixed"
				position={[0, 0.3, 0]}
				colliders="hull"
				restitution={0.2}
				friction={0}
			>
				<primitive
					object={reward.scene}
					scale={0.8}
					rotation-y={-Math.PI / 2}
				/>
			</RigidBody>
		</group>
	);
}
