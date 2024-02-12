<script lang="ts">
	import { beatIndex } from "./clock.store";
	import type { Rhythm } from "./types";

	export let rhythm: Rhythm;
</script>

<div class="flex gap-1 my-2">
	{#each rhythm.pattern as beat, i (`${i}-${beat}`)}
		{@const isPlaying =
			($beatIndex - rhythm.offset) % rhythm.steps ===
			(i - rhythm.offset) % rhythm.steps}
		<div
			class:!bg-blue-300={beat && !isPlaying}
			class:!bg-blue-400={beat && isPlaying}
			class:!bg-neutral-100={!beat}
			class:!bg-blue-200={!beat && isPlaying}
			data-beat={beat}
			class="visualizer-step inset-box"
		>
			<div
				class:!bg-blue-400={beat && isPlaying}
				class:!bg-blue-200={!beat && isPlaying}
				class:!blur={isPlaying}
				class="visualizer-step-glow-1"
			></div>
			<div
				class:!bg-blue-500={beat && isPlaying}
				class:!bg-blue-200={!beat && isPlaying}
				class:!blur-sm={isPlaying}
				class="visualizer-step-glow-2"
			></div>
		</div>
		<!-- <div
			data-beat={beat}
			style:--beat-offset={rhythm.offset}
			style:--beat-steps={rhythm.steps}
			style:--index={i}
			class="visualizer-step inset-box IS_PLAYING_PLACEHOLDER"
		>
			<div class="visualizer-step-glow"></div>
		</div> -->
	{/each}
</div>

<style lang="postcss">
	.visualizer-step {
		/* $beatIndex - rhythm.offset) % rhythm.steps === (i - rhythm.offset) % rhythm.steps */
		/* --beat-playing: calc(
			mod(calc(attr(data-beat) - var(--beat-offset)), var(--beat-steps) * 500%)
		); */
		@apply w-full h-2 relative
			transition-all duration-75;

		& .visualizer-step-glow-1 {
			@apply absolute top-0 left-0 w-full h-full transition-all duration-75 opacity-25;
		}
		& .visualizer-step-glow-2 {
			@apply absolute top-0 left-0 w-full h-full transition-all duration-100 opacity-25;
		}
	}
</style>
