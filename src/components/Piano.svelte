<script lang="ts">
	import * as Tone from "tone";
	import OctaveOffsetInput from "./OctaveOffsetInput.svelte";
	import { onMount } from "svelte";

	let octaveOffset = 3;
	let octavesShown = 2;

	const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
	const blackKeys = ["C#", "D#", "F#", "G#", "A#"];
	type Key = `${
		| (typeof whiteKeys)[number]
		| (typeof blackKeys)[number]}${number}`;

	let synth: Tone.PolySynth;
	let keysDown: Record<Key, boolean> = {};
	let leftMouseDown = false;

	onMount(() => {
		synth = new Tone.PolySynth({
			maxPolyphony: 8,
			voice: Tone.Synth,
			volume: -12,
			options: { oscillator: { type: "sine" } },
		}).toDestination();
	});

	const keyDown = (key: Key) => {
		synth.triggerAttack(key);
		keysDown[key] = true;
	};
	const keyUp = (key: Key) => {
		synth.triggerRelease(key);
		keysDown[key] = false;
	};
</script>

<div id="settings">
	<OctaveOffsetInput bind:octavesShown bind:octaveOffset />
</div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="piano"
	on:mouseleave={() => {
		leftMouseDown = false;
	}}
	class="grid grid-cols-4 w-full"
>
	{#each new Array(octavesShown) as _, i}
		<div class="piano-octave-container aspect-video">
			<div class="piano-white">
				{#each whiteKeys as key}
					<button
						on:mouseenter={() =>
							leftMouseDown && keyDown(`${key}${i + octaveOffset}`)}
						on:mousedown={() => {
							keyDown(`${key}${i + octaveOffset}`);
							leftMouseDown = true;
						}}
						on:mouseup={() => {
							keyUp(`${key}${i + octaveOffset}`);
							leftMouseDown = false;
						}}
						on:mouseleave={() => keyUp(`${key}${i + octaveOffset}`)}
						style="grid-area: {key}; background-color: {keysDown[
							`${key}${i + octaveOffset}`
						]
							? '#ffffff'
							: '#f5f2e4'};"
						class="white-key"
					></button>
				{/each}
			</div>
			<div class="piano-black">
				{#each blackKeys as key}
					<button
						on:mouseenter={() =>
							leftMouseDown && keyDown(`${key}${i + octaveOffset}`)}
						on:mousedown={() => {
							keyDown(`${key}${i + octaveOffset}`);
							leftMouseDown = true;
						}}
						on:mouseup={() => {
							keyUp(`${key}${i + octaveOffset}`);
							leftMouseDown = false;
						}}
						on:mouseleave={() => keyUp(`${key}${i + octaveOffset}`)}
						style="grid-area: {key.replace('#', 's')};"
						class="black-key"
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
	.black-key {
		background-color: black;
		border-radius: 0vw 0vw 0.5vw 0.5vw;
		border: 1px solid #ffffff40;
	}
</style>
