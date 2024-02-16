import { writable, get } from "svelte/store";
import type { Instrument, Instruments, Rhythm } from "./types";
import * as Tone from "tone";
import { INSTRUMENT_TYPES, VOLUME_MIN, chordsObj } from "./consts";
import { getPattern } from "euclidean-rhythms";
import { eq } from "./eq.store";

type InstrumentsStore = Instrument[];
export const instruments = writable<InstrumentsStore>([
	{ name: "Cymatics - Trap/hihat/Drill.wav", synth: null },
	{ name: "Cymatics - Trap/clap/Future(Gs).wav", synth: null },
	{ name: "Cymatics - Orchid/808/Short(C).wav", synth: null },
	{ name: "Cymatics - Trap/rimshot/Sigma.wav", synth: null },
]);

type RhythmsStore = Rhythm[];
export const rhythms = writable<RhythmsStore>([
	{
		pulses: 5,
		steps: 8,
		notes: ["C{{0}}", "D{{0}}"],
		octave: 4,
		volume: -6,
		offset: 0,
		pattern: getPattern(5, 8),
		notesPerBeat: 4,
		arp: {
			enabled: true,
			dir: "asc",
		},
	},
	{
		pulses: 3,
		steps: 8,
		notes: ["C{{0}}", "D{{0}}", "E{{0}}"],
		octave: 4,
		volume: -14,
		offset: 0,
		pattern: getPattern(3, 8),
		notesPerBeat: 2,
		arp: {
			enabled: true,
			dir: "asc",
		},
	},
	{
		pulses: 1,
		steps: 16,
		notes: ["C{{0}}"],
		octave: 5,
		volume: -14,
		offset: 0,
		pattern: getPattern(1, 16),
		notesPerBeat: 1,
		arp: {
			enabled: false,
			dir: "asc",
		},
	},
	{
		pulses: 3,
		steps: 8,
		notes: ["C{{0}}"],
		octave: 4,
		volume: -5,
		offset: 0,
		pattern: getPattern(3, 8),
		notesPerBeat: 1,
		arp: {
			enabled: true,
			dir: "asc",
		},
	},
]);

const getPatternFromRhythm = (rhythm: Rhythm) => {
	// get pattern using pulses and steps then offset the pattern
	const { pulses, steps, offset } = rhythm;
	const pattern = getPattern(pulses, steps);
	const newPattern = [
		...pattern.slice(steps - offset),
		...pattern.slice(0, steps - offset),
	];
	return newPattern;
};

export const getInstrumentSynth = (
	type: (typeof INSTRUMENT_TYPES)[number],
	volume: number,
) => {
	let synth = null;
	// get what is inside of "()" ex. "starlight(C).wav" -> "C"
	const urlNote = `${type.match(/\(([^)]+)\)/)?.[1] ?? "C"}4`.replace("s", "#");
	const $eq = get(eq);
	synth = new Tone.Sampler({
		urls: {
			[urlNote]: `${type}`,
		},
		volume,
		baseUrl: "https://o2dependent.github.io/audio/",
	}).toDestination();
	if ($eq) synth.connect($eq);
	// if (type === "pluck") {
	// 	// synth = new Tone.PluckSynth().toDestination();
	// } else if (type === "membrane") {
	// 	synth = new Tone.MembraneSynth().toDestination();
	// } else if (type === "synth") {
	// 	synth = new Tone.Synth().toDestination();
	// } else if (type === "metal") {
	// 	synth = new Tone.MetalSynth().toDestination();
	// }
	return synth;
};

export const changeInstrument = (
	index: number,
	type: (typeof INSTRUMENT_TYPES)[number],
) => {
	const $instruments = get(instruments);
	let newInstruments: InstrumentsStore = [...$instruments];
	if (index > newInstruments.length) {
		console.error("Cannot change instrument at index greater than length + 1");
		return;
	} else if (index === newInstruments.length) {
		newInstruments = [...newInstruments, { name: type, synth: null }];
	}
	if (newInstruments[index].synth) {
		newInstruments?.[index]?.synth?.dispose?.();
		newInstruments[index].synth = null;
	}
	const newInstrument = { ...newInstruments[index] };
	const $rhythms = get(rhythms);
	const rhythm = $rhythms[index];
	const synth = getInstrumentSynth(type, rhythm?.volume ?? -10);
	newInstrument.synth = synth;
	newInstrument.name = type;
	newInstruments[index] = newInstrument;
	instruments.set(newInstruments);
};

export const addRhythm = () => {
	const $rhythms = get(rhythms);
	const newRhythms: RhythmsStore = [
		...$rhythms,
		{
			pulses: 3,
			steps: 8,
			notes: ["C{{0}}"],
			octave: 4,
			volume: -8,
			offset: 0,
			pattern: getPattern(3, 8),
			notesPerBeat: 1,
			arp: {
				enabled: false,
				dir: "asc",
			},
		},
	];
	changeInstrument(newRhythms.length - 1, INSTRUMENT_TYPES[0]);
	rhythms.set(newRhythms);
};

export const removeRhythm = (index: number) => {
	const $rhythms = get(rhythms);
	const $instruments = get(instruments);
	const newRhythms = $rhythms.filter((_, i) => i !== index);
	$instruments?.[index]?.synth?.dispose();
	$instruments[index].synth = null;
	const newInstruments = $instruments.filter((_, i) => i !== index);
	rhythms.set(newRhythms);
	instruments.set(newInstruments);
};

export const changeOctave = (index: number, inc: number) => {
	rhythms.update(($rhythms) =>
		$rhythms.map((r, j) => {
			const octave = r.octave + inc;
			if (j !== index || octave < 0 || octave > 8) {
				return r;
			}
			return { ...r, octave };
		}),
	);
};

export const changeSteps = (index: number, inc: number) => {
	const $rhythms = get(rhythms);
	const rhythm = $rhythms[index];
	if (!rhythm) return;
	let newSteps = rhythm.steps + inc;
	let newPulses = rhythm.pulses;
	if (newSteps < newPulses) {
		newPulses = newSteps;
	} else if (newPulses < 0) {
		newPulses = 0;
	}
	rhythm.pulses = newPulses;
	rhythm.steps = newSteps;
	rhythm.pattern = getPatternFromRhythm(rhythm);
	const newRhythms = $rhythms.map((r, j) => (j === index ? rhythm : r));
	rhythms.set(newRhythms);
};

export const changePulses = (index: number, inc: number) => {
	const $rhythms = get(rhythms);
	const rhythm = $rhythms[index];
	if (!rhythm) return;
	let newPulses = rhythm.pulses + inc;
	if (newPulses > rhythm.steps) {
		newPulses = rhythm.steps;
	} else if (newPulses < 0) {
		newPulses = 0;
	}
	rhythm.pulses = newPulses;
	rhythm.pattern = getPatternFromRhythm(rhythm);
	const newRhythms = $rhythms.map((r, j) => (j === index ? rhythm : r));
	rhythms.set(newRhythms);
};

export const changeOffset = (index: number, inc: number) => {
	const $rhythms = get(rhythms);
	const rhythm = $rhythms[index];
	if (!rhythm) return;
	let newOffset = rhythm.offset + inc;
	if (newOffset < 0) {
		newOffset = 0;
	} else if (newOffset > rhythm.steps) {
		newOffset = rhythm.steps;
	}
	rhythm.offset = newOffset;
	rhythm.pattern = getPatternFromRhythm(rhythm);
	const newRhythms = $rhythms.map((r, j) => (j === index ? rhythm : r));
	rhythms.set(newRhythms);
};

export const changeVolume = (index: number, value: number) => {
	rhythms.update(($rhythms) =>
		$rhythms.map((r, j) => (j === index ? { ...r, volume: value } : r)),
	);
	if (value === VOLUME_MIN) {
		value = -Infinity;
	}
	const $instruments = get(instruments);
	$instruments?.[index]?.synth?.volume?.set({
		value,
	});
};

export const instrumentsOnMount = () => {
	const $rhythms = get(rhythms);

	instruments.update(($instruments) =>
		$instruments.map((instrument, i) => {
			if (instrument.synth) {
				instrument.synth.dispose();
				instrument.synth = null;
			}
			const rhythm = $rhythms?.[i];
			const type = instrument.name;
			const newInstrument = { ...instrument };
			const synth = getInstrumentSynth(type, rhythm?.volume ?? -10);
			newInstrument.synth = synth;
			return newInstrument;
		}),
	);
	return () =>
		instruments.update(($instruments) => {
			$instruments.forEach((instrument) => {
				if (instrument.synth) {
					instrument.synth.dispose();
					instrument.synth = null;
				}
			});
			return $instruments;
		});
};
