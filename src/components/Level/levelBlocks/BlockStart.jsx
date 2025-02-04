import { Float, Text } from "@react-three/drei";
import { boxGeometry } from "../geometries/Geometry";
import { floorMaterial } from "../materials/Materials";

export function BlockStart({ position = [0, 0, 0] }) {
	return (
		/* sTART POSITION Floor */
		<group position={position}>
			<Float>
				<Text
					scale={0.5}
					fontStyle="italic"
					font="./fonts/bebas-neue.woff"
					textAlign="center"
					position={[0.75, 0.85, 0]}
					color={"#4e4ebc"}
				>
					{/* НАЗВАНИЕ ИГРЫ */}
					ROUND RACER
					<meshBasicMaterial toneMapped={false} />
				</Text>
			</Float>
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
