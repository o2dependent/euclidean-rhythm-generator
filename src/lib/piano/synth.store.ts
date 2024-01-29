import { get, writable } from "svelte/store";
import * as Tone from "tone";
import { keysDown } from "./keysDown.store";
import type { Key } from "./keys";

type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U>
		? Array<RecursivePartial<U>>
		: T[P] extends object
		? RecursivePartial<T[P]>
		: T[P];
};

export const synth = writable<Tone.PolySynth | null>(null);

export const synthInit = () => {
	const dist = new Tone.Distortion(0.4).toDestination();
	// const dist = new Tone.Distortion(0.05).toDestination();
	// const freeverb = new Tone.Freeverb({ dampening: 100 }).toDestination();
	// const chorus = new Tone.Chorus("2n", 0.1, 0.1).toDestination().start();
	const reverb = new Tone.Reverb({ decay: 0.25, wet: 1 }).toDestination();
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
	const autoFilter = new Tone.AutoFilter({
		frequency: "8n",
		depth: 1,
		wet: 1,
		octaves: -3,
		type: "sine",
	})
		.toDestination()
		.start();
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
	const tremolo = new Tone.Tremolo(0.5, 1).toDestination().start();

	const newSynth = new Tone.PolySynth({
		options: {
			oscillator: {
				type: "square",
			},
		},
		// envelope: {
		// 	attack: 0.02,
		// 	decay: 0.1,
		// 	sustain: 0.2,
		// 	release: 0.9,
		// },
		// portamento: 0,
	}).chain(dist, tremolo, reverb);
	synth.set(newSynth);
};

export const keyDown = (key: Key) => {
	if (get(keysDown)[key]) return;
	get(synth)?.triggerAttack(key);
	keysDown.update((old) => ({ ...old, [key]: true }));
};
export const keyUp = (key: Key) => {
	if (!get(keysDown)[key]) return;
	get(synth)?.triggerRelease(key);
	keysDown.update((old) => ({ ...old, [key]: false }));
};
