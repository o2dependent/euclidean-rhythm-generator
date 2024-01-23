<script lang="ts">
	import { octaveOffset, octavesShown } from "./../lib/piano/octaves.store.ts";
	import { keyDown, keyUp, synth } from "./../lib/piano/synth.store.ts";
	import * as Tone from "tone";
	import OctaveOffsetInput from "./OctaveOffsetInput.svelte";
	import { onMount } from "svelte";
	import { keysDown } from "../lib/piano/keysDown.store.ts";
	import { blackKeys, whiteKeys, type KeyNote } from "../lib/piano/keys.ts";
	import { addPianoKeyboardListeners } from "../lib/piano/addPianoKeyboardListeners.ts";

	onMount(() => {
		synth.set(
			new Tone.PolySynth({
				voice: Tone.Synth,
				volume: -12,
				options: { oscillator: { type: "sine" } },
			}).toDestination(),
		);

		const { removeListeners } = addPianoKeyboardListeners();
		return () => removeListeners();
	});

	const keyMouseEnter = (key: KeyNote, octave: number) => () =>
		$keysDown["mouse_left"] && keyDown(`${key}${octave + $octaveOffset}`);
	const keyMouseDown = (key: KeyNote, octave: number) => () => {
		keyDown(`${key}${octave + $octaveOffset}`);
		keysDown.update((old) => ({ ...old, mouse_left: true }));
	};
	const keyMouseUp = (key: KeyNote, octave: number) => () => {
		keyUp(`${key}${octave + $octaveOffset}`);
		keysDown.update((old) => ({ ...old, mouse_left: false }));
	};
	const keyMouseLeave = (key: KeyNote, octave: number) => () =>
		keyUp(`${key}${octave + $octaveOffset}`);
</script>

<div id="settings">
	<OctaveOffsetInput />
</div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="piano"
	on:mouseleave={() => {
		keysDown.update((old) => ({ ...old, mouse_left: false }));
	}}
	class="grid grid-cols-4 w-full"
>
	{#each new Array($octavesShown) as _, i}
		<div class="piano-octave-container aspect-video">
			<div class="piano-white">
				{#each whiteKeys as key}
					<button
						on:mouseenter={keyMouseEnter(key, i)}
						on:mousedown={keyMouseDown(key, i)}
						on:mouseup={keyMouseUp(key, i)}
						on:mouseleave={keyMouseLeave(key, i)}
						style="grid-area: {key};"
						class="white-key"
						class:pressed={$keysDown[`${key}${i + $octaveOffset}`]}
					></button>
				{/each}
			</div>
			<div class="piano-black">
				{#each blackKeys as key}
					<button
						on:mouseenter={keyMouseEnter(key, i)}
						on:mousedown={keyMouseDown(key, i)}
						on:mouseup={keyMouseUp(key, i)}
						on:mouseleave={keyMouseLeave(key, i)}
						style="grid-area: {key.replace('#', 's')};"
						class="black-key"
						class:pressed={$keysDown[`${key}${i + $octaveOffset}`]}
					></button>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	#piano {
		user-select: none;
	}
	.piano-octave-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr 1fr;
	}
	.piano-black {
		grid-area: 1 / 1 / 3 / 2;
		display: grid;
		grid-template-areas: ". . Cs Cs . Ds Ds . . . . Fs Fs . Gs Gs . As As . .";
	}
	.piano-white {
		grid-area: 1 / 1 / 4 / 2;
		display: grid;
		grid-template-areas: "C C C D D D E E E F F F G G G A A A B B B";
	}
	.white-key {
		background-color: #f5f2e4;
		border-radius: 0vw 0vw 0.5vw 0.5vw;
		border: 1px solid #00000040;
	}
	.white-key.pressed {
		background-color: hsl(49, 46%, 98%);
	}
	.black-key {
		background-color: #000000;
		border-radius: 0vw 0vw 0.5vw 0.5vw;
		border: 1px solid #ffffff40;
	}
	.black-key.pressed {
		background-color: hsl(0, 0%, 14%);
	}
</style>
