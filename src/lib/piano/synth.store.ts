import { get, writable } from "svelte/store";
import * as Tone from "tone";
import { keysDown } from "./keysDown.store";
import type { Key } from "./keys";

export const synth = writable<Tone.PolySynth | null>(null);

export const keyDown = (key: Key) => {
	if (get(keysDown)[key]) return;
	get(synth)?.triggerAttack(key);
	keysDown.update((old) => ({ ...old, [key]: true }));
};
export const keyUp = (key: Key) => {
	if (!get(keysDown)[key]) return;
	get(synth)?.triggerRelease(key);
	keysDown.update((old) => ({ ...old, [key]: false }));
};
