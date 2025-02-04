import { useMemo } from "react";

import {
	BlockEnd,
	BlockHorizontalLift,
	BlockSpinner,
	BlockStart,
	BlockVerticalLift,
} from "../Level/levelBlocks";
import Bounds from "../Level/levelComponents/Bounds";
import { Sky} from "@react-three/drei";

export default function Level({
	count = 5,
	types = [BlockSpinner, BlockVerticalLift, BlockHorizontalLift],
	randomizer = 0,
}) {
	const blocks = useMemo(() => {
		const blocks = [];
		for (let i = 0; i < count; i++) {
			const type = types[Math.floor(Math.random() * types.length)];
			blocks.push(type);
		}
		return blocks;
	}, [count, types, randomizer]);

	return (
		<>
			<Sky
				distance={5000}
				sunPosition={[0, 1, 0]}
				inclination={2}
				azimuth={0.7}
			/>

			<BlockStart position={[0, 0, 0]} />
			{blocks.map((Block, index) => (
				<Block
					key={`${Block.name}-${index}`}
					position={[0, 0, -(index + 1) * 4]}
				/>
			))}

			<BlockEnd position={[0, 0, -(count + 1) * 4]} />

			<Bounds length={count + 2} />
		</>
	);
}
