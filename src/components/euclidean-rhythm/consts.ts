import type { Instruments } from "./types";

export const INSTRUMENT_TYPES: (keyof Instruments)[] = [
	"membrane",
	"pluck",
	"synth",
	"metal",
];
export const VOLUME_MAX = 12;
export const VOLUME_MIN = -24;
