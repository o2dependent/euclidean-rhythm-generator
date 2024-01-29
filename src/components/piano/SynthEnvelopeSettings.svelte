<script lang="ts">
	// @ts-ignore
	import Knob from "svelte-knob";
	import { synth } from "@/lib/piano/synth.store";
	import { onMount } from "svelte";

	let canvas: HTMLCanvasElement;
	let ctx: null | CanvasRenderingContext2D = null;
	let attack = 0.005;
	let decay = 0.1;
	let sustain = 0.3;
	let release = 1;

	const ATTACK_MAX = 5;
	const DECAY_MAX = 5;
	const SUSTAIN_MAX = 1;
	const RELEASE_MAX = 5;

	$: {
		if (ctx) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.fillRect(0, 0, (canvas.width * attack) / ATTACK_MAX, canvas.height);
			ctx.fillRect(
				(canvas.width * (attack + decay)) / ATTACK_MAX,
				0,
				(canvas.width * sustain) / SUSTAIN_MAX,
				canvas.height,
			);
			ctx.fillRect(
				(canvas.width * (attack + decay + sustain)) / ATTACK_MAX,
				0,
				(canvas.width * release) / RELEASE_MAX,
				canvas.height,
			);
		}
		console.log($synth?.get());
		$synth?.set({
			envelope: {
				// attackCurve: "exponential",
				attack,
				decay,
				sustain,
				release,
			},
		});
	}

	const displaySeconds = (v: number) => {
		v = Math.round(v * 100) / 100;
		if (v < 1) {
			return `${v * 1000}ms`;
		}
		return `${v}s`;
	};
	const displayPercent = (v: number) => `${v * 100}%`;

	onMount(() => {
		ctx = canvas.getContext("2d");
	});
</script>

<div class="flex flex-col gap-1">
	<p>Envelope</p>
	<canvas bind:this={canvas} />

	<p>Attack</p>
	<Knob
		bind:value={attack}
		step={0.01}
		min={0}
		max={ATTACK_MAX}
		valueDisplayFunction={displaySeconds}
	/>
	<p>Decay</p>
	<Knob
		bind:value={decay}
		step={0.01}
		min={0}
		max={DECAY_MAX}
		valueDisplayFunction={displaySeconds}
	/>
	<p>Sustain</p>
	<Knob
		bind:value={sustain}
		step={0.01}
		min={0}
		max={SUSTAIN_MAX}
		valueDisplayFunction={displayPercent}
	/>
	<p>Release</p>
	<Knob
		bind:value={release}
		step={0.01}
		min={0}
		max={RELEASE_MAX}
		valueDisplayFunction={displaySeconds}
	/>
</div>
