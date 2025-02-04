import "./interface.css";

import { useKeyboardControls } from "@react-three/drei";
import useStore from "../store/store";
import { useShallow } from "zustand/react/shallow";
export default function Interface() {
	const { forward, backward, left, right, jump } = useKeyboardControls(
		(state) => state
	);
	const { restart, phase } = useStore(
		useShallow((state) => ({
			restart: state.restart,
			phase: state.phase,
		}))
	);
	return (
		<>
			<div className="interface">
				<div className="time">0.00</div>
			</div>

			{phase === "finish" && (
				<div className="restart" onClick={restart}>
					Restart
				</div>
			)}

			<div className="controls">
				<div className="raw">
					<div className={`key ${forward ? "active" : ""}`}></div>
				</div>
				<div className="raw">
					<div className={`key ${left ? "active" : ""}`}></div>
					<div className={`key ${backward ? "active" : ""}`}></div>
					<div className={`key ${right ? "active" : ""}`}></div>
				</div>
				<div className="raw">
					<div className={`key large ${jump ? "active" : ""}`}></div>
				</div>
			</div>
		</>
	);
}
