import { chordsObj } from "@/components/euclidean-rhythm/consts";

export const getChordNotes = (chord: keyof typeof chordsObj, octave: number) =>
	chordsObj[chord].map((note) =>
		note
			.replace("{{0}}", octave.toString())
			.replace("{{1}}", (octave + 1).toString()),
	);
