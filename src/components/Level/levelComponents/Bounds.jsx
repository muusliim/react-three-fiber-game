import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { boxGeometry } from "../geometries/Geometry";
import { wall } from "../materials/Materials";

export default function Bounds({ length = 1 }) {
	return (
		//LEFT AND RIGHT WALLS
		<>
			<RigidBody type="fixed" restitution={0.2} friction={0}>
				<mesh
					geometry={boxGeometry}
					material={wall}
					scale={[0.3, 1.5, length * 4]}
					position={[-2.15, 0.75, -(length * 2) + 2]}
					receiveShadow
				/>
				<mesh
					geometry={boxGeometry}
					material={wall}
					scale={[0.3, 1.5, length * 4]}
					position={[2.15, 0.75, -(length * 2) + 2]}
					castShadow
				/>
				<mesh
					geometry={boxGeometry}
					material={wall}
					scale={[4, 1.5, 0.3]}
					position={[0, 0.75, -(length * 4) + 2]}
					receiveShadow
				/>
				<CuboidCollider
					args={[2, 0.1, 2 * length]}
					position={[0, -0.1, -(length * 2) + 2]}
                    friction={1}
                    restitution={0.2}
				/>
			</RigidBody>
		</>
	);
}
