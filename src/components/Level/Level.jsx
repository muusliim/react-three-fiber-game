import { useMemo } from "react";

import {
	BlockEnd,
	BlockHorizontalLift,
	BlockSpinner,
	BlockStart,
	BlockVerticalLift,
} from "../Level/levelBlocks";
import Bounds from "../Level/levelComponents/Bounds";

export default function Level({
	count = 5,
	types = [BlockSpinner, BlockVerticalLift, BlockHorizontalLift],
}) {
	const blocks = useMemo(() => {
		const blocks = [];
		for (let i = 0; i < count; i++) {
			const type = types[Math.floor(Math.random() * types.length)];
			blocks.push(type);
		}
		return blocks;
	}, [count, types]);

	return (
		<>
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
