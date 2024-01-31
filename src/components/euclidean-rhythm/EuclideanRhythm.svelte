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
	import Knob from "./Knob.svelte";

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
		volume: number;
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
			volume: 0,
		},
		{
			pulses: 3,
			steps: 8,
			note: "C",
			octave: 2,
			volume: 0,
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
				volume: 0,
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
	let playing = false;
	const play = () => {
		if (["stopped", "paused"].includes(clock?.state as string)) {
			clock?.start();
			playing = true;
		}
	};
	const stop = () => {
		if (["started", "paused"].includes(clock?.state as string)) {
			clock?.stop();
			beatIndex = 0;
			playing = false;
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

	const changeVolume = (index: number) => (value: number) => {
		rhythms = rhythms.map((r, j) =>
			j === index ? { ...r, volume: value } : r,
		);
		instruments[index].synth?.volume.set({ value });
	};
</script>

<div class="flex flex-col gap-1 bg-gray-200 h-full py-8 px-4">
	<button
		class="btn h-12"
		type="button"
		on:click={() => console.log({ instruments })}>FUCK</button
	>
	<button class="btn h-12" type="button" on:click={addRhythm}>Add Rhythm</button
	>
	<button
		class="btn aspect-square w-12"
		class:pressed={playing}
		type="button"
		on:click={!playing ? play : stop}
	>
		{#if !playing}
			<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
					fill="currentColor"
					fill-rule="evenodd"
					clip-rule="evenodd"
				>
				</path>
			</svg>
		{:else}
			<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M2 3C2 2.44772 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V12C13 12.5523 12.5523 13 12 13H3C2.44772 13 2 12.5523 2 12V3ZM12 3H3V12H12V3Z"
					fill="currentColor"
					fill-rule="evenodd"
					clip-rule="evenodd"
				>
				</path>
			</svg>
		{/if}
	</button>

	{#each rhythms as rhythm, i}
		<div class="flex flex-col gap-1">
			<div class="flex gap-1">
				<div class="flex flex-col">
					<p class="text-neutral-800">Pulses</p>
					<div class="flex gap-2">
						<div
							class="w-8 h-16 flex items-center justify-center rounded-sm inset-box text-neutral-700"
						>
							<p>{rhythm.pulses}</p>
						</div>
						<div class="flex flex-col">
							<button
								type="button"
								on:click={(e) => {
									let value = rhythm.pulses + 1;
									if (value > rhythm.steps) {
										value = rhythm.steps;
									} else if (value < 0) {
										value = 0;
									}
									rhythms = rhythms.map((r, j) =>
										j === i ? { ...r, pulses: value } : r,
									);
								}}
								class="btn sm w-8 h-8"
							>
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"
									></path></svg
								>
							</button>
							<button
								type="button"
								on:click={(e) => {
									let value = rhythm.pulses - 1;
									if (value > rhythm.steps) {
										value = rhythm.steps;
									} else if (value < 0) {
										value = 0;
									}
									rhythms = rhythms.map((r, j) =>
										j === i ? { ...r, pulses: value } : r,
									);
								}}
								class="btn sm w-8 h-8"
							>
								<svg
									class="rotate-180"
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"
									></path></svg
								>
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<p class="text-neutral-800">Steps</p>
					<div class="flex gap-2">
						<div
							class="w-8 h-16 flex items-center justify-center rounded-sm inset-box text-neutral-700"
						>
							<p>{rhythm.steps}</p>
						</div>
						<div class="flex flex-col">
							<button
								type="button"
								on:click={(e) => {
									let newTotal = rhythm.steps + 1;
									let newOn = rhythm.pulses;
									if (newTotal < newOn) {
										newOn = newTotal;
									}
									rhythms = rhythms.map((r, j) =>
										j === i ? { ...r, pulses: newOn, steps: newTotal } : r,
									);
								}}
								class="btn sm w-8 h-8"
							>
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"
									></path></svg
								>
							</button>
							<button
								type="button"
								on:click={(e) => {
									let newTotal = rhythm.steps - 1;
									let newOn = rhythm.pulses;
									if (newTotal < newOn) {
										newOn = newTotal;
									}
									rhythms = rhythms.map((r, j) =>
										j === i ? { ...r, pulses: newOn, steps: newTotal } : r,
									);
								}}
								class="btn sm w-8 h-8"
							>
								<svg
									class="rotate-180"
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"
									></path></svg
								>
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<p class="text-neutral-800">Instrument</p>
					<select
						class="h-8 flex items-center bg-transparent px-2 appearance-none w-max justify-center rounded-sm inset-box text-neutral-700"
						value={instruments?.[i]?.name ?? INSTRUMENT_TYPES[0]}
						on:change={onChangeInstrument(i)}
					>
						{#each INSTRUMENT_TYPES as instrument}
							<option value={instrument}>{instrument}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-col">
					<p class="text-neutral-800">Note</p>
					<select
						class="h-8 flex items-center bg-transparent px-2 appearance-none w-max justify-center rounded-sm inset-box text-neutral-700"
						value={rhythm.note}
						on:change={onNoteChange(i)}
					>
						{#each [...whiteKeys, ...blackKeys] as key}
							<option value={key}>{key}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-col">
					<p class="text-neutral-800">Octave</p>
					<div class="flex gap-2">
						<div
							class="w-8 h-16 flex items-center justify-center rounded-sm inset-box text-neutral-700"
						>
							<p>{rhythm.octave}</p>
						</div>
						<div class="flex flex-col">
							<button
								type="button"
								on:click={(e) => {
									rhythms = rhythms.map((r, j) => {
										const octave = r.octave + 1;
										if (j !== i || octave < 0 || octave > 8) {
											return r;
										}
										return { ...r, octave };
									});
								}}
								class="btn sm w-8 h-8"
							>
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"
									></path></svg
								>
							</button>
							<button
								type="button"
								on:click={(e) => {
									rhythms = rhythms.map((r, j) => {
										const octave = r.octave - 1;
										if (j !== i || octave < 0 || octave > 8) {
											return r;
										}
										return { ...r, octave };
									});
								}}
								class="btn sm w-8 h-8"
							>
								<svg
									class="rotate-180"
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"
									></path></svg
								>
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<p class="text-neutral-800">Volume</p>
					<Knob
						value={rhythm.volume}
						onChange={changeVolume(i)}
						min={-12}
						max={12}
					/>
				</div>
				<div class="flex justify-center items-center">
					<button class="btn sm error w-12 h-full" on:click={removeRhythm(i)}>
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							class=""
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
								fill="currentColor"
								fill-rule="evenodd"
								clip-rule="evenodd"
							>
							</path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.inset-box {
		box-shadow:
			inset 0px -1px 2px rgba(0, 0, 0, 0.05),
			inset 1px -2px 2px rgba(0, 0, 0, 0.04737),
			inset 2px -3px 2px rgba(0, 0, 0, 0.04474),
			inset 0px 1px 2px rgba(0, 0, 0, 0.05),
			inset -1px 2px 2px rgba(0, 0, 0, 0.04737),
			inset -2px 3px 2px rgba(0, 0, 0, 0.04474),
			inset -3px 4px 2px rgba(0, 0, 0, 0.04211),
			inset -4px 5px 2px rgba(0, 0, 0, 0.03947),
			inset -5px 6px 2px rgba(0, 0, 0, 0.03684),
			inset -6px 7px 2px rgba(0, 0, 0, 0.03421),
			inset -7px 8px 2px rgba(0, 0, 0, 0.03158),
			inset -8px 9px 2px rgba(0, 0, 0, 0.02895),
			inset -19px 20px 2px transparent;
	}
	.btn.sm {
		box-shadow:
			inset -2px 0 1px 1px rgba(255, 255, 255, 0.7),
			inset 0 0 8px 8px rgba(128, 128, 128, 0.1),
			inset -10px 4px 10px 2px rgba(0, 0, 0, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-1px 2px 2px rgba(0, 0, 0, 0.04737),
			-2px 3px 2px rgba(0, 0, 0, 0.04474),
			-3px 4px 2px rgba(0, 0, 0, 0.04211),
			-4px 5px 2px rgba(0, 0, 0, 0.03947),
			-5px 6px 2px rgba(0, 0, 0, 0.03684),
			-6px 7px 2px rgba(0, 0, 0, 0.03421),
			-7px 8px 2px rgba(0, 0, 0, 0.03158),
			-8px 9px 2px rgba(0, 0, 0, 0.02895),
			-9px 10px 2px rgba(0, 0, 0, 0.02632),
			-19px 20px 2px transparent;
		@apply border-b-2 border-neutral-400 -top-0.5 duration-100;
	}
	.btn.sm.pressed,
	.btn.sm:active {
		box-shadow:
			inset -2px 0 1px 1px rgba(255, 255, 255, 0.7),
			inset 0 0 8px 8px rgba(128, 128, 128, 0.1),
			inset -10px 4px 10px 2px rgba(0, 0, 0, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-0px 1px 1px rgba(0, 0, 0, 0.04737),
			-1px 1px 1px rgba(0, 0, 0, 0.04474),
			-2px 2px 1px rgba(0, 0, 0, 0.04211),
			-3px 3px 1px rgba(0, 0, 0, 0.03947),
			-3px 3px 1px rgba(0, 0, 0, 0.03684),
			-4px 4px 1px rgba(0, 0, 0, 0.03421),
			-4px 4px 1px rgba(0, 0, 0, 0.03158),
			-5px 5px 1px rgba(0, 0, 0, 0.02895),
			-5px 5px 1px rgba(0, 0, 0, 0.02632),
			-19px 20px 1px transparent;
		@apply border-b border-neutral-500 top-px duration-100;
	}
	.btn {
		box-shadow:
			inset -2px 0 1px 1px rgba(255, 255, 255, 0.7),
			inset 0 0 8px 8px rgba(128, 128, 128, 0.1),
			inset -10px 4px 10px 2px rgba(0, 0, 0, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-1px 2px 2px rgba(0, 0, 0, 0.04737),
			-2px 3px 2px rgba(0, 0, 0, 0.04474),
			-3px 4px 2px rgba(0, 0, 0, 0.04211),
			-4px 5px 2px rgba(0, 0, 0, 0.03947),
			-5px 6px 2px rgba(0, 0, 0, 0.03684),
			-6px 7px 2px rgba(0, 0, 0, 0.03421),
			-7px 8px 2px rgba(0, 0, 0, 0.03158),
			-8px 9px 2px rgba(0, 0, 0, 0.02895),
			-9px 10px 2px rgba(0, 0, 0, 0.02632),
			-10px 11px 2px rgba(0, 0, 0, 0.02368),
			-11px 12px 2px rgba(0, 0, 0, 0.02105),
			-12px 13px 2px rgba(0, 0, 0, 0.01842),
			-13px 14px 2px rgba(0, 0, 0, 0.01579),
			-14px 15px 2px rgba(0, 0, 0, 0.01316),
			-15px 16px 2px rgba(0, 0, 0, 0.01053),
			-16px 17px 2px rgba(0, 0, 0, 0.00789),
			-17px 18px 2px rgba(0, 0, 0, 0.00526),
			-18px 19px 2px rgba(0, 0, 0, 0.00263),
			-19px 20px 2px transparent;
		/* border-bottom: 10px solid rgb(170, 170, 170); */
		@apply border-b-8 border-neutral-400 bg-gradient-to-r from-neutral-100 to-neutral-300 transition-all duration-200 mx-px -top-1 relative flex items-center justify-center ease-out;
	}
	.btn.error {
		box-shadow:
			inset -2px 0 1px 1px rgba(255, 155, 155, 0.7),
			inset 0 0 8px 8px rgba(128, 28, 28, 0.1),
			inset -10px 4px 10px 2px rgba(0, 0, 0, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-1px 2px 2px rgba(0, 0, 0, 0.04737),
			-2px 3px 2px rgba(0, 0, 0, 0.04474),
			-3px 4px 2px rgba(0, 0, 0, 0.04211),
			-4px 5px 2px rgba(0, 0, 0, 0.03947),
			-5px 6px 2px rgba(0, 0, 0, 0.03684),
			-6px 7px 2px rgba(0, 0, 0, 0.03421),
			-7px 8px 2px rgba(0, 0, 0, 0.03158),
			-8px 9px 2px rgba(0, 0, 0, 0.02895),
			-9px 10px 2px rgba(0, 0, 0, 0.02632),
			-10px 11px 2px rgba(0, 0, 0, 0.02368),
			-11px 12px 2px rgba(0, 0, 0, 0.02105),
			-12px 13px 2px rgba(0, 0, 0, 0.01842),
			-13px 14px 2px rgba(0, 0, 0, 0.01579),
			-14px 15px 2px rgba(0, 0, 0, 0.01316),
			-15px 16px 2px rgba(0, 0, 0, 0.01053),
			-16px 17px 2px rgba(0, 0, 0, 0.00789),
			-17px 18px 2px rgba(0, 0, 0, 0.00526),
			-18px 19px 2px rgba(0, 0, 0, 0.00263),
			-19px 20px 2px transparent;
		@apply border-b-8 border-red-600 bg-gradient-to-r from-red-400 to-red-500;
	}
	.btn.error svg {
		@apply stroke-red-200;
	}
	.btn.error.pressed,
	.btn.error:active {
		@apply border-red-700 bg-gradient-to-r from-red-500 to-red-600;
	}
	.btn svg {
		width: 20px;
		height: 20px;
		stroke: #999999;
	}
	.btn.pressed,
	.btn:active {
		box-shadow:
			inset -1px 0 1px 1px rgba(255, 255, 255, 0.4),
			inset 0 0 8px 8px rgba(128, 128, 128, 0.1),
			inset -10px 4px 10px 2px rgba(128, 128, 128, 0.05),
			inset -10px 4px 10px 2px rgba(128, 128, 128, 0.05),
			0px 0px rgba(0, 0, 0, 0.1),
			0px 1px 2px rgba(0, 0, 0, 0.05),
			-1px 2px 2px rgba(0, 0, 0, 0.04643),
			-2px 3px 2px rgba(0, 0, 0, 0.04286),
			-3px 4px 2px rgba(0, 0, 0, 0.03929),
			-4px 5px 2px rgba(0, 0, 0, 0.03571),
			-5px 6px 2px rgba(0, 0, 0, 0.03214),
			-6px 7px 2px rgba(0, 0, 0, 0.02857),
			-7px 8px 2px rgba(0, 0, 0, 0.025),
			-8px 9px 2px rgba(0, 0, 0, 0.02143),
			-9px 10px 2px rgba(0, 0, 0, 0.01786),
			-10px 11px 2px rgba(0, 0, 0, 0.01429),
			-11px 12px 2px rgba(0, 0, 0, 0.01071),
			-12px 13px 2px rgba(0, 0, 0, 0.00714),
			-13px 14px 2px rgba(0, 0, 0, 0.00357),
			-14px 15px 2px transparent;
		/* border-bottom: 4px solid rgb(153, 153, 153); */
		@apply border-b-4 border-neutral-500 top-px z-0 bg-gradient-to-r from-neutral-200 to-neutral-300;
	}
</style>
