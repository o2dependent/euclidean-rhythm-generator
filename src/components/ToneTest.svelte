<script lang="ts">
	import * as Tone from "tone";

	let loops: Tone.Loop[];

	function play() {
		var synth = new Tone.PolySynth().toDestination();

		var C_chord = ["C3", "E3", "G3"];
		var F_chord = ["F2", "C3", "A3"];
		var G_chord = ["G2", "D3", "B3"];

		var pianoPart = new Tone.Part(
			function (time, chord) {
				synth.triggerAttackRelease(chord, "2n", time);
			},
			[
				// ["0:2", chords("Dm", 4)],
				// ["0:4", chords("Bb", 4)],
				// ["0:6", chords("A", 4)],
				// ["0:8", chords("Asus4", 4)],
				// ["0:10", chords("Am", 4)],
				// ["0:12", chords("Dm", 4)],
				// ["0:14", chords("Am", 4)],
				// ["0:16", chords("Dm", 4)],
				// ["0:18", chords("Bb", 4)],
				// ["0:20", chords("F", 4)],
				// ["0:22", chords("Em", 4)],
				// ["0:24", chords("Am", 4)],
				// ["0:26", chords("Dm", 4)],
				// ["0:28", chords("Dm", 4)],
			],
		).start();

		Tone.Transport.start();

		// const synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
		// const loop1 = new Tone.Loop((time) => {}, "4n").start(0);

		// const synth2 = new Tone.MembraneSynth().toDestination();
		// const loop2 = new Tone.Loop((time) => {
		// 	// synth2.triggerAttackRelease("C8", "8n");
		// }, "8n").start(0);

		// const synth3 = new Tone.MembraneSynth().toDestination();
		// const loop3 = new Tone.Loop((time) => {
		// 	// synth3.triggerAttackRelease("C4", "2n");
		// }, "2n").start(0);

		// Tone.Transport.start();
		// loops = [loop1, loop2, loop3];
	}

	const stop = () => {
		Tone.Transport.stop();
		loops.forEach((loop) => {
			loop.stop();
			loop.dispose();
		});
	};
</script>

<button type="button" on:click={play}>play</button>
<button type="button" on:click={stop}>stop</button>
