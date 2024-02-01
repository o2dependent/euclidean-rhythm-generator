<script lang="ts">
	export let notePlayed = false;

	let steps = 5;
</script>

<div
	class="speaker-container"
	style="--steps: {steps};"
	class:play-note={notePlayed}
>
	{#each new Array(steps * steps) as _, i}
		<div
			class="aspect-square w-1.5 bg-neutral-950 rounded-full"
			class:opacity-0={[
				0,
				steps - 1,
				steps * (steps - 1),
				steps * steps - 1,
			].includes(i)}
			style="animation-delay: {i}ms; box-shadow: 0 2px 1px #FFF;"
		></div>
	{/each}
</div>

<style lang="postcss">
	.speaker-container {
		@apply grid gap-0.5 aspect-square;
		grid-template-columns: repeat(var(--steps), 0.5rem);
		grid-template-rows: repeat(var(--steps), 0.5rem);
	}
	@keyframes speaker-shake {
		0% {
			scale: 1;
		}
		50% {
			scale: 1.01;
		}
		100% {
			scale: 1;
		}
	}
	.speaker-container.play-note {
		animation: speaker-shake 0.25s;
	}
</style>
