const baseChords = {
	Gm: (octave: number) => [`G${octave}`, `A#${octave}`, `D${octave + 1}`],
	Dm: (octave: number) => [`D${octave}`, `F${octave}`, `A${octave}`],
	Bb: (octave: number) => [`Bb${octave}`, `D${octave + 1}`, `F${octave}`],
	A: (octave: number) => [`A${octave}`, `C#${octave + 1}`, `E${octave + 1}`],
	Asus4: (octave: number) => [`A${octave}`, `D${octave}`, `E${octave + 1}`],
	Am: (octave: number) => [`A${octave}`, `C${octave}`, `E${octave}`],
	F: (octave: number) => [`F${octave}`, `A${octave}`, `C${octave + 1}`],
	Em: (octave: number) => [`E${octave}`, `G${octave}`, `B${octave}`],
	C: (octave: number) => [`C${octave}`, `E${octave}`, `G${octave}`],
	Bbm: (octave: number) => [`Bb${octave}`, `Db${octave}`, `F${octave}`],
	D: (octave: number) => [`D${octave}`, `F#${octave}`, `A${octave + 1}`],
} as const;

export const chords = (chord: keyof typeof baseChords, octave: number) =>
	baseChords[chord](octave);
