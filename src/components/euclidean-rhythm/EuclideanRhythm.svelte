<script lang="ts">
	import ArrowIcon from "../icon/ArrowIcon.svelte";
	import EQInputs from "./EQInputs.svelte";
	import RhythmItem from "./RhythmItem.svelte";
	import Styles from "./Styles.svelte";
	import { clockOnMount, playing, play, stop, bpm } from "./clock.store.ts";
	import { eqOnMount } from "./eq.store.ts";
	import {
		addRhythm,
		instrumentsOnMount,
		rhythms,
	} from "./rhythms-instruments.store.ts";
	import { onMount } from "svelte";

	onMount(() => {
		const destroyEq = eqOnMount();
		const destroyInstruments = instrumentsOnMount();
		const destroyClock = clockOnMount();

		return () => {
			destroyInstruments();
			destroyClock();
			destroyEq();
		};
	});
</script>

<EQInputs />
<div class="flex flex-col gap-1 h-full py-8 px-4">
	<div class="flex flex-col gap-1 mx-auto container p-4">
		<div class="flex justify-between items-center px-4 py-2">
			<button
				class="btn aspect-square w-12"
				class:pressed={$playing}
				type="button"
				on:click={!$playing ? play : stop}
			>
				{#if !$playing}
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
						>
						</path>
					</svg>
				{:else}
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M2 3C2 2.44772 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V12C13 12.5523 12.5523 13 12 13H3C2.44772 13 2 12.5523 2 12V3ZM12 3H3V12H12V3Z"
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
						>
						</path>
					</svg>
				{/if}
			</button>

			<div class="join">
				<button class="btn join-item"><ArrowIcon /></button>
				<div class="join-item">
					<input
						bind:value={$bpm}
						type="number"
						class="input w-full max-w-xs"
					/>
				</div>
				<button class="btn join-item"><ArrowIcon dir="down" /></button>
			</div>

			<div class="flex gap-4">
				<button
					class="btn aspect-square w-12"
					type="button"
					on:click={addRhythm}
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
						></path></svg
					>
				</button>
			</div>
		</div>
		<div class="div flex flex-col w-full px-2 py-4 z-20">
			{#each $rhythms as rhythm, index}
				<RhythmItem {rhythm} {index} />
			{/each}
		</div>
	</div>
</div>

<Styles />
