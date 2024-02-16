import { writable } from "svelte/store";
import * as Tone from "tone";

export const eq = writable<Tone.EQ3 | null>(null);

export const eqOnMount = () => {
	const newEq = new Tone.EQ3({
		low: -120,
		mid: -0,
		high: -120,
		highFrequency: 1200,
		lowFrequency: 420,
	}).toDestination();
	eq.set(newEq);

	return () => {
		newEq.dispose();
		eq.set(null);
	};
};
