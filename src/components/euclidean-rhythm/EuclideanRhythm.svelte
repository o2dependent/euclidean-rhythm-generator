<script lang="ts">
	import {
		whiteKeys,
		type Key,
		type KeyNote,
		blackKeys,
	} from "@/lib/piano/keys";
	import { getPattern } from "euclidean-rhythms";
	import { onMount } from "svelte";
	import * as Tone from "tone";

	interface Instruments {
		membrane: Tone.MembraneSynth | null;
		pluck: Tone.PluckSynth | null;
	}

	interface Rhythm {
		pulses: number;
		steps: number;
		instrument: keyof Instruments;
		note: KeyNote;
		octave: number;
	}

	let instruments: Instruments = {
		membrane: null,
		pluck: null,
	};
	let rhythms: Rhythm[] = [
		{
			pulses: 5,
			steps: 16,
			instrument: "pluck",
			note: "C",
			octave: 2,
		},
		{
			pulses: 3,
			steps: 8,
			instrument: "membrane",
			note: "C",
			octave: 2,
		},
	];

	const addRhythm = () => {
		rhythms = [
			...rhythms,
			{
				pulses: 3,
				steps: 8,
				instrument: "membrane",
				note: "C",
				octave: 2,
			},
		];
	};

	let clock: Tone.Clock | null = null;
	let bpm = 5;
	let beatIndex = 0;

	const onClock = (time: number) => {
		beatIndex = beatIndex + 1;
		rhythms.forEach((rhythm) => {
			const { steps, pulses, instrument, note, octave } = rhythm;
			const key = `${note ?? "C"}${octave ?? 2}`;
			const pattern = getPattern(pulses, steps);
			if (pattern[beatIndex % steps]) {
				instruments[instrument ?? "membrane"]?.triggerAttackRelease(
					key ?? "C2",
					"8n",
					time,
				);
			}
		});
	};

	onMount(() => {
		instruments = {
			membrane: new Tone.MembraneSynth().toDestination(),
			pluck: new Tone.PluckSynth().toDestination(),
		};
		clock = new Tone.Clock(onClock, bpm);
	});

	const play = () => {
		["stopped", "paused"].includes(clock?.state as string) && clock?.start();
	};
	const stop = () => {
		if (["started", "paused"].includes(clock?.state as string)) {
			clock?.stop();
			beatIndex = 0;
		}
	};
</script>

<div class="flex flex-col gap-1">
	<button on:click={addRhythm}>Add Rhythm</button>
	<button on:click={play}>play</button>
	<button on:click={stop}>stop</button>

	{#each rhythms as rhythm, i}
		<div class="flex flex-col gap-1">
			<div class="flex gap-1">
				<p>On Notes</p>
				<input
					type="number"
					value={rhythm.pulses}
					on:change={(e) => {
						let value = e.currentTarget.valueAsNumber;
						if (value > rhythm.steps) {
							value = rhythm.steps;
						} else if (value < 0) {
							value = 0;
						}
						rhythms = rhythms.map((r, j) =>
							j === i ? { ...r, pulses: value } : r,
						);
					}}
					min={0}
					max={rhythm.steps}
				/>
				<p>Total Notes</p>
				<input
					type="number"
					value={rhythm.steps}
					on:change={(e) => {
						let newTotal = e.currentTarget.valueAsNumber;
						let newOn = rhythm.pulses;
						if (newTotal < newOn) {
							newOn = newTotal;
						}
						rhythms = rhythms.map((r, j) =>
							j === i ? { ...r, pulses: newOn, steps: newTotal } : r,
						);
					}}
					min={1}
				/>
				<p>Instrument</p>
				<select
					value={rhythm.instrument}
					on:change={(e) => {
						rhythms = rhythms.map((r, j) =>
							j === i ? { ...r, instrument: e.currentTarget.value } : r,
						);
					}}
				>
					{#each Object.keys(instruments) as instrument}
						<option value={instrument}>{instrument}</option>
					{/each}
				</select>
				<p>Note</p>
				<select
					value={rhythm.note}
					on:change={(e) => {
						rhythms = rhythms.map((r, j) =>
							j === i ? { ...r, note: e.currentTarget.value } : r,
						);
					}}
				>
					{#each [...whiteKeys, ...blackKeys] as key}
						<option value={key}>{key}</option>
					{/each}
				</select>
				<p>Octave</p>
				<input
					type="number"
					value={rhythm.octave}
					on:change={(e) => {
						rhythms = rhythms.map((r, j) =>
							j === i ? { ...r, octave: e.currentTarget.valueAsNumber } : r,
						);
					}}
					min={0}
					max={8}
				/>
				<button on:click={() => (rhythms = rhythms.filter((r) => r !== rhythm))}
					>Remove</button
				>
			</div>
			<div class="flex gap-1"></div>
		</div>
	{/each}
</div>
