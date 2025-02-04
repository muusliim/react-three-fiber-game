import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createGameSlice } from "./game-slice";

export const useStore = create(
	subscribeWithSelector((set) => ({
		...createGameSlice(set),
	}))
);

export default useStore;
