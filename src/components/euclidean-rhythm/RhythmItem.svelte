<script lang="ts">
	import { VOLUME_MIN, VOLUME_MAX, INSTRUMENT_TYPES } from "./consts.ts";
	import type { Instruments, Rhythm } from "./types.ts";
	import Knob from "./Knob.svelte";
	import Speaker from "./Speaker.svelte";
	import type { ChangeEventHandler } from "svelte/elements";
	import {
		changeInstrument,
		changeOctave,
		changeOffset,
		changePulses,
		changeSteps,
		changeVolume,
		instruments,
		removeRhythm,
		rhythms,
	} from "./rhythms-instruments.store.ts";
	import { blackKeys, whiteKeys, type KeyNote } from "@/lib/piano/keys.ts";
	import { beatIndex } from "./clock.store.ts";

	export let rhythm: Rhythm;
	export let index: number;

	const onChangeInstrument: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const type = (e.target as HTMLSelectElement).value as keyof Instruments;
		changeInstrument(index, type);
	};

	const onNoteChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const note = (e.target as HTMLSelectElement).value as KeyNote;
		rhythms.set($rhythms.map((r, j) => (j === index ? { ...r, note } : r)));
	};
</script>

<div class="flex flex-col">
	<div class="flex gap-1 -mt-1.5">
		<div class="flex gap-2 pt-1.5 w-full">
			<div class="h-full flex items-center justify-center mr-auto pr-4">
				<Speaker />
			</div>
			<div class="flex flex-col h-full w-12">
				<Knob
					value={rhythm.volume}
					onChange={(v) => changeVolume(index, v)}
					min={VOLUME_MIN}
					max={VOLUME_MAX}
				/>
			</div>
			<div class="flex flex-col">
				<div class="flex gap-2">
					<div
						class="w-8 h-16 flex items-center justify-center rounded-sm inset-box text-neutral-700"
					>
						<p>{rhythm.pulses}</p>
					</div>
					<div class="flex flex-col">
						<button
							type="button"
							on:click={() => changePulses(index, 1)}
							class="btn sm w-8 h-8"
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path></svg
							>
						</button>
						<button
							type="button"
							on:click={() => changePulses(index, -1)}
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
								<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path></svg
							>
						</button>
					</div>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="flex gap-2">
					<div
						class="w-8 h-16 flex items-center justify-center rounded-sm inset-box text-neutral-700"
					>
						<p>{rhythm.steps}</p>
					</div>
					<div class="flex flex-col">
						<button
							type="button"
							on:click={() => changeSteps(index, 1)}
							class="btn sm w-8 h-8"
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path></svg
							>
						</button>
						<button
							type="button"
							on:click={() => changeSteps(index, -1)}
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
								<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path></svg
							>
						</button>
					</div>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="flex gap-2">
					<div
						class="w-8 h-16 flex items-center justify-center rounded-sm inset-box text-neutral-700"
					>
						<p>{rhythm.offset}</p>
					</div>
					<div class="flex flex-col">
						<button
							type="button"
							on:click={() => changeOffset(index, 1)}
							class="btn sm w-8 h-8"
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path></svg
							>
						</button>
						<button
							type="button"
							on:click={() => changeOffset(index, -1)}
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
								<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path></svg
							>
						</button>
					</div>
				</div>
			</div>
			<div class="flex flex-col">
				<select
					class="h-8 flex items-center bg-transparent px-2 appearance-none w-max justify-center rounded-sm inset-box text-neutral-700"
					value={$instruments?.[index]?.name ?? INSTRUMENT_TYPES[0]}
					on:change={onChangeInstrument}
				>
					{#each INSTRUMENT_TYPES as instrument}
						<option value={instrument}>{instrument}</option>
					{/each}
				</select>
			</div>
			<div class="flex flex-col">
				<select
					class="h-8 flex items-center bg-transparent px-2 appearance-none w-max justify-center rounded-sm inset-box text-neutral-700"
					value={rhythm.note}
					on:change={onNoteChange}
				>
					{#each [...whiteKeys, ...blackKeys] as key}
						<option value={key}>{key}</option>
					{/each}
				</select>
			</div>
			<div class="flex flex-col">
				<div class="flex gap-2">
					<div
						class="w-8 h-16 flex items-center justify-center rounded-sm inset-box text-neutral-700"
					>
						<p>{rhythm.octave}</p>
					</div>
					<div class="flex flex-col">
						<button
							type="button"
							on:click={() => changeOctave(index, 1)}
							class="btn sm w-8 h-8"
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path></svg
							>
						</button>
						<button
							type="button"
							on:click={() => changeOctave(index, -1)}
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
								<path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path></svg
							>
						</button>
					</div>
				</div>
			</div>
			<div class="flex justify-center items-center">
				<button
					class="btn sm error w-12 h-full"
					on:click={() => removeRhythm(index)}
				>
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
			<div class="ml-auto h-full flex items-center justify-center pl-4">
				<Speaker />
			</div>
		</div>
	</div>
	<div class="flex gap-1 my-2">
		<div class="step-visualizer-controller peer"></div>
		{#each rhythm.pattern as beat, i}
			{@const isPlaying =
				($beatIndex - rhythm.offset) % rhythm.steps ===
				(i - rhythm.offset) % rhythm.steps}
			<div
				class:!bg-blue-300={beat && !isPlaying}
				class:!bg-blue-400={beat && isPlaying}
				class:!bg-neutral-100={!beat}
				class:!bg-blue-200={!beat && isPlaying}
				class="w-full h-2 inset-box relative transition-all duration-75"
			>
				<div
					class:!bg-blue-400={beat && isPlaying}
					class:!bg-blue-200={!beat && isPlaying}
					class:!blur={isPlaying}
					class="absolute top-0 left-0 w-full h-full transition-all duration-75 opacity-25"
				></div>
				<div
					class:!bg-blue-500={beat && isPlaying}
					class:!bg-blue-200={!beat && isPlaying}
					class:!blur-sm={isPlaying}
					class="absolute top-0 left-0 w-full h-full transition-all duration-100 opacity-25"
				></div>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.step-visualizer-controller {
	}
</style>
