<script lang="ts">
	import Knob from "../Knob.svelte";
	import { VOLUME_MAX, VOLUME_MIN } from "../consts";
	import { changeVolume } from "../rhythms-instruments.store";
	import type { Rhythm } from "../types";

	export let rhythm: Rhythm;
	export let index: number;
</script>

<div class="flex flex-col h-full w-12">
	<Knob
		value={rhythm.volume}
		onChange={(v) => changeVolume(index, v)}
		min={VOLUME_MIN}
		max={VOLUME_MAX}
	/>
</div>
