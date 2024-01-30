<script lang="ts">
	import {
		whiteKeys,
		type Key,
		type KeyNote,
		blackKeys,
	} from "@/lib/piano/keys";
	import { getPattern } from "euclidean-rhythms";
	import { onMount } from "svelte";
	import type { ChangeEventHandler } from "svelte/elements";
	import * as Tone from "tone";

	interface Instruments {
		membrane: Tone.MembraneSynth | null;
		pluck: Tone.PluckSynth | null;
	}
	type Instrument = {
		name: keyof Instruments;
		synth: Instruments[keyof Instruments];
	};

	const INSTRUMENT_TYPES: (keyof Instruments)[] = ["membrane", "pluck"];

	interface Rhythm {
		pulses: number;
		steps: number;
		note: KeyNote;
		octave: number;
	}

	let instruments: Instrument[] = [
		{ name: "pluck", synth: null },
		{ name: "membrane", synth: null },
	];
	let rhythms: Rhythm[] = [
		{
			pulses: 5,
			steps: 16,
			note: "C",
			octave: 2,
		},
		{
			pulses: 3,
			steps: 8,
			note: "C",
			octave: 2,
		},
	];

	const addRhythm = () => {
		const newRhythms: typeof rhythms = [
			...rhythms,
			{
				pulses: 3,
				steps: 8,
				note: "C",
				octave: 2,
			},
		];
		changeInstrument(newRhythms.length - 1, INSTRUMENT_TYPES[0]);
		rhythms = newRhythms;
		console.log({ instruments });
	};

	let clock: Tone.Clock | null = null;
	let bpm = 5;
	let beatIndex = 0;

	const onClock = (time: number) => {
		beatIndex = beatIndex + 1;
		rhythms.forEach((rhythm, i) => {
			const { steps, pulses, note, octave } = rhythm;
			const key = `${note ?? "C"}${octave ?? 2}`;
			const pattern = getPattern(pulses, steps);
			const instrument = instruments?.[i] ?? null;
			if (pattern[beatIndex % steps]) {
				instrument?.synth?.triggerAttackRelease(key ?? "C2", "8n", time);
			}
		});
	};

	onMount(() => {
		instruments = instruments.map((instrument) => {
			if (instrument.synth) {
				instrument.synth.dispose();
				instrument.synth = null;
			}
			const newInstrument = { ...instrument };
			if (instrument.name === "pluck") {
				newInstrument.synth = new Tone.PluckSynth().toDestination();
			} else if (instrument.name === "membrane") {
				newInstrument.synth = new Tone.MembraneSynth().toDestination();
			}
			console.log({ newInstrument });
			return newInstrument;
		});
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

	const changeInstrument = (index: number, type: keyof Instruments) => {
		let newInstruments = [...instruments];
		if (index > newInstruments.length) {
			console.error(
				"Cannot change instrument at index greater than length + 1",
			);
			return;
		} else if (index === newInstruments.length) {
			console.log("FUCK YOU");
			newInstruments = [...newInstruments, { name: type, synth: null }];
		}
		if (newInstruments[index].synth) {
			newInstruments?.[index]?.synth?.dispose?.();
			newInstruments[index].synth = null;
		}
		const newInstrument = { ...newInstruments[index] };
		if (type === "pluck") {
			newInstrument.synth = new Tone.PluckSynth().toDestination();
		} else if (type === "membrane") {
			newInstrument.synth = new Tone.MembraneSynth().toDestination();
		}
		newInstrument.name = type;
		newInstruments[index] = newInstrument;
		instruments = newInstruments;
	};

	const onChangeInstrument =
		(index: number): ChangeEventHandler<HTMLSelectElement> =>
		(e) => {
			const type = (e.target as HTMLSelectElement).value as keyof Instruments;
			changeInstrument(index, type);
		};

	const onNoteChange =
		(index: number): ChangeEventHandler<HTMLSelectElement> =>
		(e) => {
			const note = (e.target as HTMLSelectElement).value as KeyNote;
			rhythms = rhythms.map((r, j) => (j === index ? { ...r, note } : r));
		};

	const removeRhythm = (index: number) => () => {
		const newRhythms = rhythms.filter((_, i) => i !== index);
		instruments[index].synth?.dispose();
		instruments[index].synth = null;
		const newInstruments = instruments.filter((_, i) => i !== index);
		rhythms = newRhythms;
		instruments = newInstruments;
	};
</script>

<div class="flex flex-col gap-1">
	<button type="button" on:click={() => console.log({ instruments })}
		>FUCK</button
	>
	<button type="button" on:click={addRhythm}>Add Rhythm</button>
	<button type="button" on:click={play}>play</button>
	<button type="button" on:click={stop}>stop</button>

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
					value={instruments?.[i]?.name ?? INSTRUMENT_TYPES[0]}
					on:change={onChangeInstrument(i)}
				>
					{#each INSTRUMENT_TYPES as instrument}
						<option value={instrument}>{instrument}</option>
					{/each}
				</select>
				<p>Note</p>
				<select value={rhythm.note} on:change={onNoteChange(i)}>
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
				<button on:click={removeRhythm(i)}>Remove</button>
			</div>
			<div class="flex gap-1"></div>
		</div>
	{/each}
</div>
