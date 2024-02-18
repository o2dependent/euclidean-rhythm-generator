<script lang="ts">
	import RemoveRhythmButton from "./rhythm-inputs/RemoveRhythmButton.svelte";
	import RhythmOctaveInput from "./rhythm-inputs/RhythmOctaveInput.svelte";
	import RhythmInstrumentInput from "./rhythm-inputs/RhythmInstrumentInput.svelte";
	import RhythmOffsetInput from "./rhythm-inputs/RhythmOffsetInput.svelte";
	import RhythmStepsInput from "./rhythm-inputs/RhythmStepsInput.svelte";
	import VolumeInput from "./rhythm-inputs/VolumeInput.svelte";
	import StepsPerBeatInput from "./rhythm-inputs/StepsPerBeatInput.svelte";
	import ArpInputs from "./rhythm-inputs/ArpInputs.svelte";
	import type { Rhythm } from "./types.ts";
	import Speaker from "./Speaker.svelte";
	import { rhythms } from "./rhythms-instruments.store.ts";
	import { type KeyNote, type Key } from "@/lib/piano/keys.ts";
	import PianoKeys from "../PianoKeys.svelte";
	import RhythmPulsesInput from "./rhythm-inputs/RhythmPulsesInput.svelte";

	export let rhythm: Rhythm;
	export let index: number;

	$: notes = rhythm.notes;
	$: keysDown = notes.reduce(
		(acc, note, i) => ({
			...acc,
			[`${note.replaceAll(/(\{|\})/g, "")}`]: true,
		}),
		{},
	) as Partial<Record<Key, boolean>>;

	const keyMouseClick = (e: CustomEvent<{ key: KeyNote; i: 0 | 1 }>) => {
		const { key, i } = e.detail;

		let newNotes = [...notes];
		if (newNotes.some((n) => n === `${key}{{${i}}}`)) {
			newNotes = newNotes.filter((n) => n !== `${key}{{${i}}}`);
		} else {
			newNotes = [...newNotes, `${key}{{${i}}}`];
		}
		rhythms.set(
			$rhythms.map((r, j) => (j === index ? { ...r, notes: newNotes } : r)),
		);
	};
</script>

<div class="flex flex-col bg-base-200 rounded-xl px-4 pt-4 mb-2">
	<div class="flex gap-1 -mt-1.5">
		<div class="flex gap-2 pt-1.5 w-full">
			<div class="div flex gap-2">
				<ArpInputs {index} {rhythm} />
				<StepsPerBeatInput {index} {rhythm} />
				<VolumeInput {index} {rhythm} />
				<RhythmPulsesInput {index} {rhythm} />
				<RhythmStepsInput {index} {rhythm} />
				<RhythmOffsetInput {index} {rhythm} />
			</div>
			<div class="flex gap-1">
				<RhythmInstrumentInput {index} />
				<RhythmOctaveInput {index} {rhythm} />
			</div>
			<div class="flex justify-center items-center">
				<RemoveRhythmButton {index} />
			</div>
		</div>
	</div>
	<!-- <StepVisualizer {rhythm} /> -->
	<div class="flex justify-between items-center w-full gap-2">
		<div class="h-full flex items-center justify-center">
			<Speaker />
		</div>
		<div
			style="--white-pressed: hsl(200, 86%, 85%);--black-pressed: hsl(200, 36%, 44%);"
			class="w-full max-w-lg"
		>
			<PianoKeys
				{keysDown}
				octaveOffset={0}
				octavesShown={2}
				on:keyMouseClick={keyMouseClick}
			/>
		</div>
		<div class="h-full flex items-center justify-center">
			<Speaker />
		</div>
	</div>
</div>
