import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience.jsx";
import { keyBoardControls } from "./constants/keyBoardControls.js";
import Interface from "./Interface/Interface.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
	<KeyboardControls map={keyBoardControls}>
		<Canvas
			shadows
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [2.5, 4, 6],
			}}
		>
			<Experience />
		</Canvas>
		<Interface />
	</KeyboardControls>
);
