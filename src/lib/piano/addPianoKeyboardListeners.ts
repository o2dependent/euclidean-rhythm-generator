import { get } from "svelte/store";
import {
	blackKeys as _blackKeys,
	whiteKeys as _whiteKeys,
	type Key,
} from "./keys";
import { octaveOffset } from "./octaves.store";
import { keyDown, keyUp } from "./synth.store";

const whiteKeyKeyboard = [
	`a`,
	`s`,
	`d`,
	`f`,
	`g`,
	`h`,
	`j`,
	`k`,
	`l`,
	`;`,
	`'`,
];
const blackKeyKeyboard = ["w", "e", "t", "y", "u", "o", "p", "[", "]"];

const whiteKeys = [..._whiteKeys];
const blackKeys = [..._blackKeys];

const getKeyFromInput = (inputKey: string) => {
	let keyboard = whiteKeyKeyboard;
	let keys: typeof whiteKeys | typeof blackKeys = whiteKeys;
	if (blackKeyKeyboard.includes(inputKey)) {
		keyboard = blackKeyKeyboard;
		keys = blackKeys;
	}
	const valid = keyboard.includes(inputKey);
	let octave = get(octaveOffset);
	if (valid) {
		if (keyboard.indexOf(inputKey) >= keys.length) {
			octave = octave + 1;
		}
	}
	const key: Key = `${keys[keyboard.indexOf(inputKey) % keys.length]}${octave}`;
	return { key, valid };
};

const keydown = (e: KeyboardEvent) => {
	const inputKey = e.key.toLowerCase();
	const { key, valid } = getKeyFromInput(inputKey);

	if (valid) keyDown(key);
};

const keyup = (e: KeyboardEvent) => {
	const inputKey = e.key.toLowerCase();
	const { key, valid } = getKeyFromInput(inputKey);

	if (valid) keyUp(key);
};
export const addPianoKeyboardListeners = () => {
	window.addEventListener("keydown", keydown);
	window.addEventListener("keyup", keyup);

	return {
		removeListeners: () => {
			window.addEventListener("keydown", keydown);
			window.addEventListener("keyup", keyup);
		},
	};
};
