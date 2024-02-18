<script lang="ts">
	import ArrowIcon from "@/components/icon/ArrowIcon.svelte";
	import { changeOctave } from "../rhythms-instruments.store";
	import type { Rhythm } from "../types";

	export let rhythm: Rhythm;
	export let index: number;
</script>

<div class="flex flex-col">
	<div class="flex gap-2">
		<div class="w-8 h-16 flex items-center justify-center rounded-sm inset-box">
			<p>{rhythm.octave}</p>
		</div>
		<div class="flex flex-col">
			<button
				type="button"
				on:click={() => changeOctave(index, 1)}
				class="btn btn-square"
			>
				<ArrowIcon />
			</button>
			<button
				type="button"
				on:click={() => changeOctave(index, -1)}
				class="btn btn-square"
			>
				<ArrowIcon dir="down" />
			</button>
		</div>
	</div>
</div>
