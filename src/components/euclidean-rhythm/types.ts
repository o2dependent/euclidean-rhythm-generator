import type { KeyNote } from "@/lib/piano/keys";
import * as Tone from "tone";

export interface Instruments {
	membrane: Tone.MembraneSynth | null;
	pluck: Tone.PluckSynth | null;
	synth: Tone.Synth | null;
	metal: Tone.MetalSynth | null;
}
export type Instrument = {
	name: keyof Instruments;
	synth: Instruments[keyof Instruments];
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
