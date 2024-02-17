<script lang="ts">
	import { VOLUME_MIN, VOLUME_MAX, INSTRUMENT_TYPES } from "./consts.ts";
	import type { Rhythm } from "./types.ts";
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
	import { type KeyNote, type Key } from "@/lib/piano/keys.ts";
	import PianoKeys from "../PianoKeys.svelte";
	import ArrowIcon from "../icon/ArrowIcon.svelte";

	export let rhythm: Rhythm;
	export let index: number;

	const NOTES_PER_BEAT_OPTIONS: (typeof rhythm)["notesPerBeat"][] = [
		1, 2, 4, 8,
	];

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

	const onChangeInstrument: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const type = (e.target as HTMLSelectElement)
			.value as (typeof INSTRUMENT_TYPES)[number];
		changeInstrument(index, type);
	};

	const onNoteChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const note = (e.target as HTMLSelectElement).value as KeyNote;
		rhythms.set($rhythms.map((r, j) => (j === index ? { ...r, note } : r)));
	};

	const formatInstrumentName = (name: (typeof INSTRUMENT_TYPES)[number]) =>
		name
			?.split?.("/")
			?.slice(-2)
			.map((s) => s?.replace(/\(([^)]+)\)/, "").replace(".wav", ""))
			.join("/");
</script>

<div class="flex flex-col bg-base-200 rounded-xl px-4 pt-4 mb-2">
	<div class="flex gap-1 -mt-1.5">
		<div class="flex gap-2 pt-1.5 w-full">
			<div class="div flex gap-2">
				<div class="flex flex-col">
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">Arp:</span>
							<input
								type="checkbox"
								class="toggle toggle-sm"
								checked={rhythm.arp.enabled}
								on:change={(e) => {
									rhythms.update((oldRhythms) =>
										oldRhythms.map((r, j) =>
											j === index
												? {
														...r,
														arp: { ...r.arp, enabled: e.currentTarget.checked },
													}
												: r,
										),
									);
								}}
							/>
						</label>
					</div>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">Asc</span>
							<input
								type="checkbox"
								class="toggle toggle-sm"
								checked={rhythm.arp.dir === "desc"}
								on:change={(e) => {
									rhythms.update((oldRhythms) =>
										oldRhythms.map((r, j) =>
											j === index
												? {
														...r,
														arp: {
															...r.arp,
															dir: e.currentTarget.checked ? "desc" : "asc",
														},
													}
												: r,
										),
									);
								}}
							/>
							<span class="label-text">Desc</span>
						</label>
					</div>
				</div>
				<div class="join">
					{#each NOTES_PER_BEAT_OPTIONS as num}
						<button
							on:click={() => {
								rhythms.update((oldRhythms) =>
									oldRhythms.map((r, j) =>
										j === index
											? {
													...r,
													notesPerBeat: num,
												}
											: r,
									),
								);
							}}
							class:btn-primary={rhythm.notesPerBeat === num}
							class="btn join-item"
						>
							{num}
						</button>
					{/each}
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
							class="w-8 h-16 flex items-center justify-center rounded-sm inset-box"
						>
							<p>{rhythm.pulses}</p>
						</div>
						<div class="flex flex-col">
							<button
								type="button"
								on:click={() => changePulses(index, 1)}
								class="btn btn-square"
							>
								<ArrowIcon />
							</button>
							<button
								type="button"
								on:click={() => changePulses(index, -1)}
								class="btn btn-square"
							>
								<ArrowIcon dir="down" />
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="flex gap-2">
						<div
							class="w-8 h-16 flex items-center justify-center rounded-sm inset-box"
						>
							<p>{rhythm.steps}</p>
						</div>
						<div class="flex flex-col">
							<button
								type="button"
								on:click={() => changeSteps(index, 1)}
								class="btn btn-square"
							>
								<ArrowIcon />
							</button>
							<button
								type="button"
								on:click={() => changeSteps(index, -1)}
								class="btn btn-square"
							>
								<ArrowIcon dir="down" />
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="flex gap-2">
						<div
							class="w-8 h-16 flex items-center justify-center rounded-sm inset-box"
						>
							<p>{rhythm.offset}</p>
						</div>
						<div class="flex flex-col">
							<button
								type="button"
								on:click={() => changeOffset(index, 1)}
								class="btn btn-square"
							>
								<ArrowIcon />
							</button>
							<button
								type="button"
								on:click={() => changeOffset(index, -1)}
								class="btn btn-square"
							>
								<ArrowIcon dir="down" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="flex gap-1">
				<div class="flex flex-col">
					<select
						class="h-8 flex items-center bg-transparent px-2 appearance-none w-max justify-center rounded-sm inset-box"
						value={$instruments?.[index]?.name ?? INSTRUMENT_TYPES[0]}
						on:change={onChangeInstrument}
					>
						{#each INSTRUMENT_TYPES as instrument}
							<option value={instrument}
								>{formatInstrumentName(instrument)}</option
							>
						{/each}
					</select>
				</div>
				<!-- <div class="flex flex-col">
						<select
							class="h-8 flex items-center bg-transparent px-2 appearance-none w-max justify-center rounded-sm inset-box "
							value={rhythm.note}
							on:change={onNoteChange}
						>
							{#each [...whiteKeys, ...blackKeys] as key}
								<option value={key}>{key}</option>
							{/each}
						</select>
					</div> -->
				<div class="flex flex-col">
					<div class="flex gap-2">
						<div
							class="w-8 h-16 flex items-center justify-center rounded-sm inset-box"
						>
							<p>{rhythm.octave}</p>
						</div>
						<div class="flex flex-col">
							<button
								type="button"
								on:click={() => changeOctave(index, 1)}
								class="btn btn-square"
							>
								<ArrowIcon />
							</button>
							<button
								type="button"
								on:click={() => changeOctave(index, -1)}
								class="btn btn-square"
							>
								<ArrowIcon dir="down" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-center items-center">
				<button
					class="btn btn-square btn-error error"
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
