import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import * as THREE from "three";

import useStore from "../../store/store.js";
export default function Player() {
	const { blocksCount, phase, start, restart, end } = useStore(
		useShallow((state) => ({
			blocksCount: state.blocksCount,
			phase: state.phase,
			start: state.start,
			restart: state.restart,
			end: state.end,
		}))
	);
	const [subscribeKeys, getKeys] = useKeyboardControls();
	const body = useRef();
	const { rapier, world } = useRapier();

	//CAMERA POSITION
	const [smoothedCameraPosition] = useState(
		() => new THREE.Vector3(10, 10, 10)
	);
	const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

	//CONTROLS jump
	const jump = () => {
		const origin = body.current?.translation();
		origin.y -= 0.31;
		const direction = { x: 0, y: -1, z: 0 };
		const ray = new rapier.Ray(origin, direction);
		const hit = world.castRay(ray, 10, true);

		if (hit.timeOfImpact < 0.2)
			body.current?.applyImpulse({ x: 0, y: 0.5, z: 0 });
	};

	//RESET LEVEL
	const reset = () => {
		body.current.setTranslation({ x: 0, y: 1, z: 0 });
		body.current.setLinvel({ x: 0, y: 0, z: 0 });
		body.current.setAngvel({ x: 0, y: 0, z: 0 });
	};

	useEffect(() => {
		const unsubStore = useStore.subscribe(
			(state) => state.phase,
			(phase) => {
				switch (phase) {
					case "ready":
						reset();
						break;
					default:
						break;
				}
			}
		);
		const unsubJump = subscribeKeys(
			(state) => state.jump,
			(value) => {
				value && jump();
			}
		);

		const unsubscribetoAnyKey = subscribeKeys(
			(state) => state.forward || state.backward || state.left || state.right,
			(value) => {
				value && start();
			}
		);

		return () => {
			unsubJump();
			unsubscribetoAnyKey();
			unsubStore();
		};
	}, []);

	//PLAYER MOVEMENT
	useFrame((state, delta) => {
		const { forward, backward, left, right, restartGame } = getKeys();
		const impulse = { x: 0, y: 0, z: 0 };
		const torque = { x: 0, y: 0, z: 0 };

		const impulseStrength = delta * 0.6;
		const torqueStrength = delta * 0.2;

		switch (true) {
			case forward:
				impulse.z -= impulseStrength;
				torque.x -= torqueStrength;
				break;
			case backward:
				impulse.z += impulseStrength;
				torque.x += torqueStrength;
				break;
			case left:
				impulse.x -= torqueStrength;
				torque.z += torqueStrength;
				break;
			case right:
				impulse.x += torqueStrength;
				torque.z -= torqueStrength;
				break;
			case restartGame:
				restart();
			default:
				break;
		}

		body.current?.applyImpulse(impulse);
		body.current?.applyTorqueImpulse(torque);

		/*
		 CAMERA POSITION TO PLAYER
		 */
		const bodyPosition = body.current?.translation();
		const cameraPosition = new THREE.Vector3();
		cameraPosition.copy(bodyPosition);
		cameraPosition.z += 2.25;
		cameraPosition.y += 0.5;
		const cameraTarget = new THREE.Vector3();
		cameraTarget.copy(bodyPosition);
		cameraTarget.y += 0.25;

		smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
		smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

		state.camera.position.copy(smoothedCameraPosition);
		state.camera.lookAt(smoothedCameraTarget);

		/* PHASES */
		if (bodyPosition.z < -(blocksCount * 4 + 2)) {
			end();
		}

		if (bodyPosition.y < -4) {
			reset();
		}
	});

	return (
		<RigidBody
			ref={body}
			canSleep={false}
			position={[0, 1, 0]}
			colliders="ball"
			restitution={0.2}
			friction={1}
			linearDamping={0.5}
			angularDamping={0.5}
		>
			<mesh castShadow>
				<icosahedronGeometry args={[0.3, 1]} />
				<meshStandardMaterial flatShading color="mediumpurple" />
			</mesh>
		</RigidBody>
	);
}
