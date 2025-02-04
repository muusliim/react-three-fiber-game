import { Physics } from "@react-three/rapier";
import Lights from "./components/Lights/Lights.jsx";
import Level from "./components/Level/Level.jsx";

import Player from "./components/Player/Player.jsx";
import useStore from "./store/store.js";
import { useShallow } from "zustand/react/shallow";

export default function Experience() {
	const { blocksCount } = useStore(
		useShallow((state) => ({
			blocksCount: state.blocksCount,
		}))
	);
	return (
		<>
			<Physics debug={false}>
				<Lights />
				<Level count={blocksCount} />
				<Player />
			</Physics>
		</>
	);
}
