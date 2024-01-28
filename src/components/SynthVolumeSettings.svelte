<script lang="ts">
	// @ts-ignore
	import Knob from "svelte-knob";
	import { synth } from "../lib/piano/synth.store";
	let volume = -10;

	$: {
		$synth?.set({
			volume: volume,
		});
	}
</script>

<div class="flex flex-col gap-1">
	<p>Volume</p>
	<Knob bind:value={volume} min={-24} max={24} step={1} />
</div>
