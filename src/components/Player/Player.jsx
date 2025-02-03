import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
export default function Player() {
	const [subscribeKeys, getKeys] = useKeyboardControls();
	const body = useRef();
	const { rapier, world } = useRapier();

	const jump = () => {
		const origin = body.current.translation();
		origin.y -= 0.31;
		const direction = { x: 0, y: -1, z: 0 };
		const ray = new rapier.Ray(origin, direction);
		const hit = world.castRay(ray, 10, true);

		if (hit.timeOfImpact < 0.2)
			body.current?.applyImpulse({ x: 0, y: 0.5, z: 0 });
	};

	useEffect(() => {
		const unsub = subscribeKeys(
			(state) => state.jump,
			(value) => {
				value && jump();
			}
		);

		return () => {
			unsub();
		};
	}, [subscribeKeys]);

	useFrame((state, delta) => {
		const { forward, backward, left, right } = getKeys();
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
			default:
				break;
		}

		body.current?.applyImpulse(impulse);
		body.current?.applyTorqueImpulse(torque);
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
