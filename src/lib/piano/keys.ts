export const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"] as const;
export const blackKeys = ["C#", "D#", "F#", "G#", "A#"] as const;
export type KeyNote = (typeof whiteKeys)[number] | (typeof blackKeys)[number];
export type Key = `${KeyNote}${number}`;
