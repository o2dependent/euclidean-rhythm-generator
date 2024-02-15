import { get, writable } from "svelte/store";
import * as Tone from "tone";
import { instruments, rhythms } from "./rhythms-instruments.store";
import { NOTES_PER_BEAT } from "./consts";

export const clock = writable<Tone.Clock | null>(null);
export const bpm = writable<number>(160);
export const beatIndex = writable<number>(0);
export const playing = writable<boolean>(false);

bpm.subscribe(($bpm) => {
	get(clock)?.set({ frequency: ($bpm / 60) * NOTES_PER_BEAT });
});

const getBeatsPlayedInBar = (pattern: number[], curIndex: number) => {
	return pattern.reduce(
		(acc: number, v: number, i: number) => (curIndex > i ? acc + v : acc),
		0,
	);
};

export const onClock = (time: number) => {
	if (!get(playing)) return;
	const $beatIndex = get(beatIndex);
	const $rhythms = get(rhythms);
	const $instruments = get(instruments);
	$rhythms.forEach((rhythm, i) => {
		if (!rhythm || !$instruments?.[i]) return;
		const { steps, pulses, notes, octave, pattern, arp, notesPerBeat } = rhythm;

		if ($beatIndex % (NOTES_PER_BEAT / notesPerBeat) !== 0) return;

		const adjustedIndex = $beatIndex / (NOTES_PER_BEAT / notesPerBeat);

		const curIndex = adjustedIndex % steps;
		if (pattern?.[curIndex]) {
			const keys = notes.map((note) =>
				note
					.replace("{{0}}", octave.toString())
					.replace("{{1}}", (octave + 1).toString()),
			);
			const instrument = $instruments?.[i] ?? null;
			if (arp.enabled) {
				const barsPlayed = Math.floor(adjustedIndex / steps);
				// get how many played beats have been played
				const notesPlayedInBar = getBeatsPlayedInBar(pattern, curIndex);
				const beatsPlayed = barsPlayed * pulses + notesPlayedInBar;
				// get the current note index
				let curNoteIndex = beatsPlayed % notes.length;
				if (arp.dir === "desc") curNoteIndex = notes.length - curNoteIndex - 1;

				const curNote =
					notes?.[curNoteIndex]
						?.replace("{{0}}", octave.toString())
						?.replace("{{1}}", (octave + 1).toString()) ?? null;

				if (curNote === null) return;

				instrument?.synth?.triggerAttackRelease?.(curNote, "8n", time);
			} else instrument?.synth?.triggerAttackRelease?.(keys, "8n", time);
		}
	});
	const newBeatIndex = $beatIndex + 1;
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
	clock.set(new Tone.Clock(onClock, ($bpm / 60) * NOTES_PER_BEAT));
	return () => {
		const $clock = get(clock);
		$clock?.dispose?.();
		clock.set(null);
	};
};
