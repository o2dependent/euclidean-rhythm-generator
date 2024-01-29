<script lang="ts">
	import { synth } from "@/lib/piano/synth.store";
	// @ts-ignore
	import Knob from "svelte-knob";
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
	<div class="grid grid-cols-4">
		{#each OSCILLATOR_WAVE_TYPES as type}
			<button
				class="btn"
				class:active={type === oscillatorType}
				on:click={() => (oscillatorType = type)}
			>
				<WaveIcons {type} />
			</button>
		{/each}
	</div>
	<p>Modulation</p>
	<Knob
		bind:value={oscillatorModulationIndex}
		step={1}
		min={0}
		max={OSCILLATOR_MODULATION_TYPES.length - 1}
		{valueDisplayFunction}
	/>
	<p>Partials</p>
	<Knob
		bind:value={oscillatorPartial}
		step={1}
		min={0}
		max={OSCILLATOR_MAX_PARTIAL}
	/>
</div>

<style lang="postcss">
	.btn {
		@apply aspect-square p-2 bg-slate-400;
	}
	.btn.active {
		@apply bg-slate-500;
	}
</style>
