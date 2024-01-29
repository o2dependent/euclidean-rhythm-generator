<script lang="ts">
	// @ts-ignore
	import Knob from "svelte-knob";
	import { synth } from "@/lib/piano/synth.store";

	let volume = -10;
	let detune = 0;

	const MAX_DETUNE = 1200;

	$: {
		$synth?.set({
			volume: volume,
			detune: detune,
		});
	}
</script>

<div class="flex flex-col gap-1">
	<p>Volume</p>
	<Knob bind:value={volume} min={-24} max={24} step={1} />
	<p>Detune</p>
	<Knob bind:value={detune} min={-MAX_DETUNE} max={MAX_DETUNE} step={1} />
</div>
