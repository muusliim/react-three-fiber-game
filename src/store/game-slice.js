
export const createGameSlice = (set) => ({
	blocksCount: 10,
	//game
	phase: "ready",
	start: () =>
		set((state) => {
			if (state.phase === "ready" || state.phase === "finish") {
				return { phase: "playing" };
			}
			return {};
		}),
	restart: () =>
		set((state) => {
			if (state.phase === "playing" || state.phase === "finish") {
				return { phase: "ready" };
			}
			return {};
		}),
	end: () =>
		set((state) => {
			if (state.phase === "playing") {
				return { phase: "finish" };
			}
			return {};
		}),
});
