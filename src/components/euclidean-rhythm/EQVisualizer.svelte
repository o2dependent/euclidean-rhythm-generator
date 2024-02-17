<script lang="ts">
	import { onMount } from "svelte";
	import { EQ_DEFAULT } from "./consts";
	import { eq, eqValues } from "./eq.store";
	import * as Tone from "tone";
	import { instruments } from "./rhythms-instruments.store";
	import { playing } from "./clock.store";

	let analyser: Tone.Analyser | undefined;
	let canvas: HTMLCanvasElement;
	$: ctx = canvas?.getContext("2d");

	const clearCanvas = () => {
		if (!ctx || !canvas) return;
		ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
	};

	const ANALYSER_SIZE = 32;
	let barHeights: number[] = new Array(ANALYSER_SIZE).fill(0);
	const BAR_DECAY_PER_TICK = 0.0001;

	const draw = () => {
		if (!ctx) return;
		const dataArray = analyser?.getValue();

		if (!dataArray) return;

		clearCanvas();
		const barWidth = canvas?.width / (dataArray?.length - 1);
		let barHeight;
		let x = 0;

		for (let i = 0; i < (dataArray?.length ?? 0); i++) {
			if (Array.isArray(dataArray)) continue;
			const data = Math.max(0, dataArray[i] + 180);
			barHeights[i] = data;
			// if (data < barHeights[i]) {
			// 	barHeights[i] = data;
			// } else {
			// 	barHeights[i] = Math.max(0, barHeights[i] + BAR_DECAY_PER_TICK);
			// }
			barHeight = barHeights[i];

			(ctx ?? {}).fillStyle = `rgb(${barHeight + 50} ${barHeight + 50} ${
				barHeight + 50
			})`;
			// ctx?.fillRect?.(x, canvas?.height - barHeight / 2, barWidth, barHeight);
			ctx?.fillRect?.(x, canvas?.height - barHeight / 2, barWidth, barHeight);
			x += barWidth + 1;
		}
		requestAnimationFrame(draw);
	};
	playing.subscribe((p) => {
		if (p) {
			draw();
		}
	});

	eq.subscribe((e) => {
		if (analyser) {
			e?.connect(analyser);
		}
	});
	onMount(() => {
		analyser = new Tone.Analyser("fft", ANALYSER_SIZE);
		analyser.toDestination();
		$eq?.connect(analyser);
		clearCanvas();

		return () => {
			analyser?.dispose();
		};
	});
</script>

<canvas bind:this={canvas} width="720" height="320"></canvas>
<button
	class="btn btn-error"
	type="button"
	on:click={() => {
		const arr = analyser?.getValue();
		console.log(arr);
	}}
>
	TEST
</button>
