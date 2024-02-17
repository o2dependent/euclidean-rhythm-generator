export const INSTRUMENT_TYPES = [
	"Cymatics - Orchid/pluck/Starlight(C).wav",
	"Cymatics - Orchid/pluck/Water(C).wav",
	"Cymatics - Orchid/bass/Reaper(C).wav",
	"Cymatics - Orchid/bass/PerfectDonk(C).wav",
	"Cymatics - Orchid/keys/Classic(C).wav",
	"Cymatics - Orchid/keys/Swirl(C).wav",
	"Cymatics - Orchid/808/Short(C).wav",
	"Cymatics - Orchid/808/Rum(C).wav",
	"Cymatics - Trap/hihat/Blitz.wav",
	"Cymatics - Trap/hihat/Yellow.wav",
	"Cymatics - Trap/hihat/Turbo.wav",
	"Cymatics - Trap/hihat/Classic.wav",
	"Cymatics - Trap/hihat/French.wav",
	"Cymatics - Trap/hihat/TinyTick.wav",
	"Cymatics - Trap/hihat/Low.wav",
	"Cymatics - Trap/hihat/OuttaHere.wav",
	"Cymatics - Trap/hihat/Drill.wav",
	"Cymatics - Trap/hihat/Halftime.wav",
	"Cymatics - Trap/hihat/Vintage.wav",
	"Cymatics - Trap/hihat/Reverse.wav",
	"Cymatics - Trap/vocals/Chihuahua.wav",
	"Cymatics - Trap/vocals/Explosion.wav",
	"Cymatics - Trap/rimshot/Sigma.wav",
	"Cymatics - Trap/rimshot/Diamonds.wav",
	"Cymatics - Trap/rimshot/Sword.wav",
	"Cymatics - Trap/clap/Future(Gs).wav",
] as const;
export const VOLUME_MAX = 0;
export const VOLUME_MIN = -40;

export const chordsObj = {
	Cmaj: ["C{{0}}", "E{{0}}", "G{{0}}"],
	Dmin: ["D{{0}}", "F{{0}}", "A{{0}}"],
	Emin: ["E{{0}}", "G{{0}}", "B{{0}}"],
	Fmaj: ["F{{0}}", "A{{0}}", "C{{1}}"],
	Gmaj: ["G{{0}}", "B{{0}}", "D{{1}}"],
	Amin: ["A{{0}}", "C{{1}}", "E{{1}}"],
	Bdim: ["B{{0}}", "D{{0}}", "F{{0}}"],
	Ebm7: ["D#{{0}}", "F#{{0}}", "A#{{0}}", "C#{{1}}"],
	"F#min7": ["F#{{0}}", "A{{0}}", "C#{{1}}", "E{{1}}"],
	"G#dim": ["G#{{0}}", "B{{0}}", "D{{1}}"],
	Dmin7: ["D{{0}}", "F{{0}}", "A{{0}}", "C{{1}}"],
	G7: ["G{{0}}", "B{{0}}", "D{{1}}", "F{{1}}"],
	Amaj7: ["A{{0}}", "C#{{1}}", "E{{1}}", "G#{{1}}"],
	"C#min7": ["C#{{0}}", "E{{0}}", "G#{{0}}", "B{{0}}"],
	"D#dim": ["D#{{0}}", "F#{{0}}", "A{{0}}"],
	E7: ["E{{0}}", "G#{{0}}", "B{{0}}", "D{{1}}"],
} as const;

export const chords = Object.keys(chordsObj) as (keyof typeof chordsObj)[];

export const NOTES_PER_BEAT = 8;

export const EQ_DEFAULT = {
	low: 0,
	mid: 0,
	high: -20,
	highFrequency: 1200,
	lowFrequency: 420,
};
