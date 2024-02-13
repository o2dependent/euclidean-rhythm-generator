<script lang="ts">
	import { blackKeys, whiteKeys } from "@/lib/piano/keys";
	import type { KeyDownKeys } from "@/lib/piano/keysDown.store";
	import { createEventDispatcher } from "svelte";

	export let octavesShown: number = 1;
	export let keysDown: Partial<Record<KeyDownKeys, boolean>>;
	export let octaveOffset: number = 0;

	const dispatch = createEventDispatcher();

	const pianoMouseLeave = () => {
		dispatch("pianoMouseLeave");
	};

	const keyMouseEnter =
		(key: (typeof whiteKeys | typeof blackKeys)[number], i: number) => () => {
			dispatch("keyMouseEnter", {
				key,
				i,
			});
		};
	const keyMouseDown =
		(key: (typeof whiteKeys | typeof blackKeys)[number], i: number) => () => {
			dispatch("keyMouseDown", {
				key,
				i,
			});
		};
	const keyMouseUp =
		(key: (typeof whiteKeys | typeof blackKeys)[number], i: number) => () => {
			dispatch("keyMouseUp", {
				key,
				i,
			});
		};
	const keyMouseLeave =
		(key: (typeof whiteKeys | typeof blackKeys)[number], i: number) => () => {
			dispatch("keyMouseLeave", {
				key,
				i,
			});
		};
	const keyMouseClick =
		(key: (typeof whiteKeys | typeof blackKeys)[number], i: number) => () => {
			dispatch("keyMouseClick", {
				key,
				i,
			});
		};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="piano"
	on:mouseleave={pianoMouseLeave}
	style="grid-template-columns: repeat({octavesShown}, minmax(0, 1fr));"
	class="grid w-full"
>
	{#each new Array(octavesShown) as _, i}
		<div class="piano-octave-container aspect-video">
			<div class="piano-white">
				{#each whiteKeys as key}
					<button
						on:mouseenter={keyMouseEnter(key, i)}
						on:mousedown={keyMouseDown(key, i)}
						on:mouseup={keyMouseUp(key, i)}
						on:mouseleave={keyMouseLeave(key, i)}
						on:click={keyMouseClick(key, i)}
						style="grid-area: {key};"
						class="white-key"
						class:pressed={keysDown[`${key}${i + octaveOffset}`]}
					></button>
				{/each}
			</div>
			<div class="piano-black">
				{#each blackKeys as key}
					<button
						on:mouseenter={keyMouseEnter(key, i)}
						on:mousedown={keyMouseDown(key, i)}
						on:mouseup={keyMouseUp(key, i)}
						on:mouseleave={keyMouseLeave(key, i)}
						on:click={keyMouseClick(key, i)}
						style="grid-area: {key.replace('#', 's')};"
						class="black-key"
						class:pressed={keysDown[`${key}${i + octaveOffset}`]}
					></button>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	#piano {
		user-select: none;
	}
	.piano-octave-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr 1fr;
	}
	.piano-black {
		grid-area: 1 / 1 / 3 / 2;
		display: grid;
		grid-template-areas: ". . Cs Cs . Ds Ds . . . . Fs Fs . Gs Gs . As As . .";
	}
	.piano-white {
		grid-area: 1 / 1 / 4 / 2;
		display: grid;
		grid-template-areas: "C C C D D D E E E F F F G G G A A A B B B";
	}
	.white-key {
		background-color: hsl(49, 46%, 93%);
		border-radius: 0vw 0vw 6% 6%;
		border: 1px solid #00000040;
	}
	.white-key.pressed {
		background-color: var(--white-pressed, hsl(49, 46%, 98%));
	}
	.black-key {
		background-color: hsl(0, 0%, 0%);
		border-radius: 0vw 0vw 6% 6%;
		border: 1px solid #ffffff40;
	}
	.black-key.pressed {
		background-color: var(--black-pressed, hsl(0, 0%, 14%));
	}
</style>
