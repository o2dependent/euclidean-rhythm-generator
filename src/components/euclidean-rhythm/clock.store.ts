import { get, writable } from "svelte/store";
import * as Tone from "tone";
import { instruments, rhythms } from "./rhythms-instruments.store";

export const clock = writable<Tone.Clock | null>(null);
export const bpm = writable<number>(5);
export const beatIndex = writable<number>(0);
export const playing = writable<boolean>(false);

export const onClock = (time: number) => {
	let newBeatIndex = get(beatIndex) + 1;
	const $rhythms = get(rhythms);
	const $instruments = get(instruments);
	$rhythms.forEach((rhythm, i) => {
		const { steps, pulses, notes, octave, offset, pattern } = rhythm;

		const keys = notes.map((note) =>
			note
				.replace("{{0}}", octave.toString())
				.replace("{{1}}", (octave + 1).toString()),
		);
		const instrument = $instruments?.[i] ?? null;
		if (pattern[newBeatIndex % steps]) {
			instrument?.synth?.triggerAttackRelease(keys, "8n", time);
		}
	});
	beatIndex.set(newBeatIndex);
};

export const play = () => {
	const $clock = get(clock);
	if (["stopped", "paused"].includes($clock?.state as string)) {
		$clock?.start();
		playing.set(true);
	}
};

export const stop = () => {
	const $clock = get(clock);
	if (["started", "paused"].includes($clock?.state as string)) {
		$clock?.stop();
		beatIndex.set(0);
		playing.set(false);
	}
};

export const clockOnMount = () => {
	const $bpm = get(bpm);
	clock.set(new Tone.Clock(onClock, $bpm));
	return () => {
		const $clock = get(clock);
		$clock?.dispose?.();
		clock.set(null);
	};
};
