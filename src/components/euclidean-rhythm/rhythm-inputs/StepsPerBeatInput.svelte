<script lang="ts">
	import { rhythms } from "../rhythms-instruments.store";
	import type { Rhythm } from "../types";

	export let rhythm: Rhythm;
	export let index: number;

	const NOTES_PER_BEAT_OPTIONS: (typeof rhythm)["notesPerBeat"][] = [
		1, 2, 4, 8,
	];
</script>

<div class="join">
	{#each NOTES_PER_BEAT_OPTIONS as num}
		<button
			on:click={() => {
				rhythms.update((oldRhythms) =>
					oldRhythms.map((r, j) =>
						j === index
							? {
									...r,
									notesPerBeat: num,
								}
							: r,
					),
				);
			}}
			class:btn-primary={rhythm.notesPerBeat === num}
			class="btn join-item"
		>
			{num}
		</button>
	{/each}
</div>
