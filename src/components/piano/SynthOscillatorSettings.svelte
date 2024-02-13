<script lang="ts">
	import Knob from "./../euclidean-rhythm/Knob.svelte";
	import { synth } from "@/lib/piano/synth.store";
	import WaveIcons from "../WaveIcons.svelte";

	const OSCILLATOR_WAVE_TYPES = [
		"sine",
		"sawtooth",
		"triangle",
		"square",
	] as const;
	const OSCILLATOR_MODULATION_TYPES = ["", "fat", "am", "fm"] as const;
	const OSCILLATOR_MAX_PARTIAL = 32;

	let oscillatorType =
		OSCILLATOR_WAVE_TYPES[0] as (typeof OSCILLATOR_WAVE_TYPES)[number];
	let oscillatorModulationIndex = 0;
	let oscillatorPartial = 0;

	const changeOscillatorType = ({
		type,
		partialCount,
		modulation,
	}: {
		type: (typeof OSCILLATOR_WAVE_TYPES)[number];
		partialCount: number;
		modulation: (typeof OSCILLATOR_MODULATION_TYPES)[number];
	}) => {
		$synth?.set({
			oscillator: {
				type: `${modulation}${type}`,
				partialCount,
			},
		});
	};

	$: {
		changeOscillatorType({
			type: oscillatorType,
			modulation: OSCILLATOR_MODULATION_TYPES[oscillatorModulationIndex],
			partialCount: oscillatorPartial,
		});
	}

	const valueDisplayFunction = (v: number) =>
		v === 0 ? "none" : OSCILLATOR_MODULATION_TYPES[v];
</script>

<div class="flex flex-col gap-1">
	<p>Oscillator Type</p>
	<div class="join grid grid-cols-4">
		{#each OSCILLATOR_WAVE_TYPES as type}
			<button
				class="btn join-item"
				class:btn-primary={type === oscillatorType}
				on:click={() => (oscillatorType = type)}
			>
				<WaveIcons {type} />
			</button>
		{/each}
	</div>
	<p>Modulation</p>
	<div class="join grid grid-cols-4">
		{#each OSCILLATOR_MODULATION_TYPES as type, i}
			<button
				class="btn join-item"
				class:btn-primary={i === oscillatorModulationIndex}
				on:click={() => (oscillatorModulationIndex = i)}
			>
				{valueDisplayFunction(i)}
			</button>
		{/each}
	</div>
	<!-- <Knob
		bind:value={oscillatorModulationIndex}
		step={1}
		min={0}
		max={OSCILLATOR_MODULATION_TYPES.length - 1}
	/> -->
	<p>Partials</p>
	<!-- <Knob
		bind:value={oscillatorPartial}
		step={1}
		min={0}
		max={OSCILLATOR_MAX_PARTIAL}
	/> -->
	<p>{oscillatorPartial}</p>
	<div class="join">
		<button
			type="button"
			on:click={() => (oscillatorPartial = oscillatorPartial + 1)}
			class="btn btn-square btn-join"
		>
			<svg
				width="15"
				height="15"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"> </path>
			</svg>
		</button>
		<button
			type="button"
			on:click={() => (oscillatorPartial = oscillatorPartial - 1)}
			class="btn btn-square btn-join"
		>
			<svg
				class="rotate-180"
				width="15"
				height="15"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"> </path>
			</svg>
		</button>
	</div>
</div>
