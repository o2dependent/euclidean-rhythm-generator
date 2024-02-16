import { get, writable } from "svelte/store";
import * as Tone from "tone";
import { EQ_DEFAULT } from "./consts";

export const eq = writable<Tone.EQ3 | null>(null);

export const eqValues = writable<typeof EQ_DEFAULT>(EQ_DEFAULT);

eqValues.subscribe(($eqValues) => {
	const $eq = get(eq);
	if (!$eq) return;
	$eq.set($eqValues);
});

export const eqOnMount = () => {
	const $eqValues = get(eqValues);
	const newEq = new Tone.EQ3($eqValues).toDestination();
	eq.set(newEq);

	return () => {
		newEq.dispose();
		eq.set(null);
	};
};
