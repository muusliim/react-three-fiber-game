export const createGameSlice = (set) => ({
	blocksCount: 10,
	blockRandomizer: 0,

	//time
	startTime: 0,
	endTime: 0,
	//game
	phase: "ready",
	start: () =>
		set((state) => {
			if (state.phase === "ready") {
				return { phase: "playing", startTime: Date.now() };
			}
			return {};
		}),
	restart: () =>
		set((state) => {
			if (state.phase === "playing" || state.phase === "finish") {
				return { phase: "ready", blockRandomizer: Math.random() };
			}
			return {};
		}),
	end: () =>
		set((state) => {
			if (state.phase === "playing") {
				return { phase: "finish", endTime: Date.now() };
			}
			return {};
		}),
});
