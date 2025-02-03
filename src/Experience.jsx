import { Physics } from "@react-three/rapier";
import Lights from "./components/Lights/Lights.jsx";
import Level from "./components/Level/Level.jsx";

import Player from "./components/Player/Player.jsx";

export default function Experience() {
	return (
		<>
			<Physics debug={false}>
				<Lights />
				<Level />
				<Player />
			</Physics>
		</>
	);
}
