import { boxGeometry } from "../geometries/Geometry";
import { floorMaterial } from "../materials/Materials";

export function BlockStart({ position = [0, 0, 0] }) {
	return (
		/* sTART POSITION Floor */
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={floorMaterial}
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				receiveShadow
			/>
		</group>
	);
}
