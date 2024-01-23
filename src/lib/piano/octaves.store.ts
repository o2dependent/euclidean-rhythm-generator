import { get, writable } from "svelte/store";
import { keysDown } from "./keysDown.store";
import { keyUp } from "./synth.store";
import type { Key } from "./keys";

export const octaveOffset = writable(4);

octaveOffset.subscribe((value) => {
	const $keysDown = get(keysDown);
	Object.entries($keysDown).forEach(([key, value]) => {
		if (value) keyUp(key as Key);
	});
});

export const octavesShown = writable(2);
