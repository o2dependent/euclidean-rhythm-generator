<script lang="ts">
	import { octaveOffset, octavesShown } from "@/lib/piano/octaves.store.ts";
	import { keyDown, keyUp, synthInit } from "@/lib/piano/synth.store.ts";
	import { onMount } from "svelte";
	import { keysDown } from "@/lib/piano/keysDown.store.ts";
	import { blackKeys, whiteKeys, type KeyNote } from "@/lib/piano/keys.ts";
	import { addPianoKeyboardListeners } from "@/lib/piano/addPianoKeyboardListeners.ts";
	import PianoSettings from "./PianoSettings.svelte";
	import PianoKeys from "../PianoKeys.svelte";

	onMount(() => {
		synthInit();

		const { removeListeners } = addPianoKeyboardListeners();
		return () => removeListeners();
	});

	const keyMouseEnter = (key: KeyNote, octave: number) =>
		$keysDown["mouse_left"] && keyDown(`${key}${octave + $octaveOffset}`);
	const keyMouseDown = (key: KeyNote, octave: number) => {
		keyDown(`${key}${octave + $octaveOffset}`);
		keysDown.update((old) => ({ ...old, mouse_left: true }));
		console.log($keysDown);
	};
	const keyMouseUp = (key: KeyNote, octave: number) => {
		keyUp(`${key}${octave + $octaveOffset}`);
		keysDown.update((old) => ({ ...old, mouse_left: false }));
	};
	const keyMouseLeave = (key: KeyNote, octave: number) =>
		$keysDown["mouse_left"] && keyUp(`${key}${octave + $octaveOffset}`);
</script>

<PianoSettings />
<PianoKeys
	keysDown={$keysDown}
	octaveOffset={$octaveOffset}
	octavesShown={$octavesShown}
	on:pianoMouseLeave={() => {
		keysDown.update((old) => ({ ...old, mouse_left: false }));
	}}
	on:keyMouseEnter={(e) => keyMouseEnter(e.detail.key, e.detail.i)}
	on:keyMouseDown={(e) => keyMouseDown(e.detail.key, e.detail.i)}
	on:keyMouseUp={(e) => keyMouseUp(e.detail.key, e.detail.i)}
	on:keyMouseLeave={(e) => keyMouseLeave(e.detail.key, e.detail.i)}
/>
