<script lang="ts">
	import { rhythms } from "../rhythms-instruments.store";
	import type { Rhythm } from "../types";

	export let rhythm: Rhythm;
	export let index: number;

	const STEPS_PER_BEAT_OPTIONS: (typeof rhythm)["stepsPerBeat"][] = [
		1, 2, 4, 8,
	];
</script>

<div class="join">
	{#each STEPS_PER_BEAT_OPTIONS as spb}
		<button
			on:click={() => {
				rhythms.update((oldRhythms) =>
					oldRhythms.map((r, j) =>
						j === index
							? {
									...r,
									stepsPerBeat: spb,
								}
							: r,
					),
				);
			}}
			class:btn-primary={rhythm.stepsPerBeat === spb}
			class="btn join-item"
		>
			{spb}
		</button>
	{/each}
</div>
