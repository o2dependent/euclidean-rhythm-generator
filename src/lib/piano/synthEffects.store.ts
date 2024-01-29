import { writable } from "svelte/store";

export type SynthEffect = {
	name: string;
	options: any;
};

// const dist = new Tone.Distortion(0.4).toDestination();
// const dist = new Tone.Distortion(0.05).toDestination();
// const freeverb = new Tone.Freeverb({ dampening: 100 }).toDestination();
// const chorus = new Tone.Chorus("2n", 0.1, 0.1).toDestination().start();
// const reverb = new Tone.Reverb({ decay: 0.25, wet: 1 }).toDestination();
// const bitcrush = new Tone.BitCrusher(5).toDestination();
// const cheby = new Tone.Chebyshev(4).toDestination();
// const autoWah = new Tone.AutoWah(50, 6, -30).toDestination();
// const autoPanner = new Tone.AutoPanner({
// 	frequency: "16n",
// 	depth: 0.25,
// 	type: "sine",
// 	wet: 1,
// })
// 	.toDestination()
// 	.start();
// const autoFilter = new Tone.AutoFilter({
// 	frequency: "8n",
// 	depth: 1,
// 	wet: 1,
// 	octaves: -3,
// 	type: "sine",
// })
// 	.toDestination()
// 	.start();
// const feedbackDelay = new Tone.FeedbackDelay("32n", 0.25).toDestination();
// const shift = new Tone.FrequencyShifter(42).toDestination();

// const jcreverb = new Tone.JCReverb(0.4).toDestination();
// const phaser = new Tone.Phaser({
// 	frequency: 15,
// 	octaves: 5,
// 	baseFrequency: 1000,
// }).toDestination();
// const stereoWidener = new Tone.StereoWidener({
// 	width: 0.15,
// 	wet: 1,
// }).toDestination();
// const tremolo = new Tone.Tremolo(9, 0.75).toDestination().start();

export const synthEffects = writable<SynthEffect[]>([]);
