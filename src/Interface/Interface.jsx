import "./interface.css";
import { useRef, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import { useShallow } from "zustand/react/shallow";
import useStore from "../store/store";
export default function Interface() {
	const timeRef = useRef();

	const { forward, backward, left, right, jump } = useKeyboardControls(
		(state) => state
	);

	useEffect(() => {
		const unsubscribeEffect = addEffect(() => {
			const state = useStore.getState();
			let elapsedTime = 0;
			if (state.phase === "playing") {
				elapsedTime = Date.now() - state.startTime;
			} else if (state.phase === "finish") {
				elapsedTime = state.endTime - state.startTime;
			}
			elapsedTime = (elapsedTime / 1000).toFixed(2);
			if (timeRef.current) timeRef.current.textContent = elapsedTime;
		});

		return () => unsubscribeEffect();
	});
	const { restart, phase } = useStore(
		useShallow((state) => ({
			restart: state.restart,
			phase: state.phase,
		}))
	);
	return (
		<>
			<div className="interface">
				<div ref={timeRef} className="time">
					0.00
				</div>
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
