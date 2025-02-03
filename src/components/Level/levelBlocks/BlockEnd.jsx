import { useGLTF } from "@react-three/drei";
import { boxGeometry } from "../geometries/Geometry";
import { floorMaterial } from "../materials/Materials";
import { RigidBody } from "@react-three/rapier";

export function BlockEnd({ position = [0, 0, 0] }) {
	const reward = useGLTF("./reward.glb");
	reward.scene.traverse((child) => {
		if (child.isMesh) {
			child.castShadow = true;
		}
	});

	return (
		/* sTART POSITION Floor */
		<group position={position}>
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
