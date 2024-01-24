<script lang="ts">
	import { synth } from "../lib/piano/synth.store";
	// @ts-ignore
	import Knob from "svelte-knob";

	const OSCILLATOR_TYPES = [
		"sine",
		"square",
		"sawtooth",
		"triangle",
		"fmsine",
		"fmsquare",
		"fmsawtooth",
		"fmtriangle",
		"amsine",
		"amsquare",
		"amsawtooth",
		"amtriangle",
		"fatsine",
		"fatsquare",
		"fatsawtooth",
		"fattriangle",
	] as const;
	const OSCILLATOR_MAX_LEVEL = 32;

	let oscillatorType = OSCILLATOR_TYPES[0] as (typeof OSCILLATOR_TYPES)[number];
	let oscillatorLevel = 1;

	const changeOscillatorType = (type: OscillatorType) => {
		$synth?.set({ oscillator: { type } });
	};

	$: {
		changeOscillatorType(
			`${oscillatorType}${oscillatorLevel}` as OscillatorType,
		);
	}
</script>

<div class="flex flex-col gap-1">
	<p>Oscillator Type</p>
	<select
		name="oscillator-type"
		id="oscillator-type"
		bind:value={oscillatorType}
	>
		{#each OSCILLATOR_TYPES as type}
			<option value={type}>{type}</option>
		{/each}
	</select>
	<Knob
		bind:value={oscillatorLevel}
		step={1}
		min={1}
		max={OSCILLATOR_MAX_LEVEL}
	/>
</div>
