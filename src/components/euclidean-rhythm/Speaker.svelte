<script lang="ts">
	export let realist: boolean = false;
	let steps = 5;
</script>

<div class="speaker-container" style="--steps: {steps};">
	{#each new Array(steps * steps) as _, i}
		<div
			class="speaker-hole"
			class:realist
			class:opacity-0={[
				0,
				steps - 1,
				steps * (steps - 1),
				steps * steps - 1,
			].includes(i)}
		></div>
	{/each}
</div>

<style lang="postcss">
	.speaker-container {
		@apply grid gap-0.5 aspect-square;
		grid-template-columns: repeat(var(--steps), 0.5rem);
		grid-template-rows: repeat(var(--steps), 0.5rem);
	}
	.speaker-hole {
		@apply aspect-square w-1.5 bg-neutral-500 rounded-full;
	}
	.speaker-hole.realist {
		box-shadow: 0 2px 1px #fff;
	}
</style>
