import type { KeyNote } from "@/lib/piano/keys";
import * as Tone from "tone";
import type { INSTRUMENT_TYPES } from "./consts";

export interface Instruments {
	membrane: Tone.MembraneSynth | null;
	pluck: Tone.PluckSynth | null;
	synth: Tone.Synth | null;
	metal: Tone.MetalSynth | null;
}
export type Instrument = {
	name: (typeof INSTRUMENT_TYPES)[number];
	synth: Tone.Sampler | null;
};
export interface Rhythm {
	pulses: number;
	steps: number;
	note: KeyNote;
	octave: number;
	volume: number;
	offset: number;
	pattern: number[];
}
