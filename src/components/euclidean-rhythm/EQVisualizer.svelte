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
		ctx.fillStyle = "black";
		ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
	};

	const ANALYSER_SIZE = 2 ** 6;
	let barHeights: number[] = new Array(ANALYSER_SIZE).fill(0);
	let STARTING_X_TEST_VALUE = 0;
	const draw = () => {
		if (!ctx) return;
		const dataArray = analyser?.getValue();

		if (!dataArray) return;

		clearCanvas();
		// const barWidth = canvas?.width / dataArray?.length;
		const barWidth = Math.floor(canvas?.width / dataArray?.length);
		console.log({
			barWidth,
			canvasWidth: canvas?.width,
			dataArrayLength: dataArray?.length,
		});
		let barHeight;
		let x = STARTING_X_TEST_VALUE + canvas?.width / dataArray?.length / 2;

		for (let i = 0; i < (dataArray?.length ?? 0); i++) {
			if (Array.isArray(dataArray)) continue;
			const data = Math.max(0, dataArray[i] + 280);
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
			x += barWidth;
			// x += barWidth + 1;
		}
		requestAnimationFrame(draw);
	};

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
		const ani = requestAnimationFrame(draw);
		const limiter = new Tone.Limiter(-20).toDestination();
		analyser.connect(limiter);
		return () => {
			analyser?.dispose();
			cancelAnimationFrame(ani);
		};
	});
</script>

<input
	type="range"
	min="-{ANALYSER_SIZE * 2}"
	max={ANALYSER_SIZE * 2}
	class="range"
	bind:value={STARTING_X_TEST_VALUE}
/>
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
