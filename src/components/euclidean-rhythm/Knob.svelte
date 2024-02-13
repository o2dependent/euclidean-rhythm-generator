<script lang="ts">
	export let value: number;
	export let onChange: ((value: number) => void) | undefined = undefined;
	export let min: number;
	export let max: number;
	export let step: number | undefined = undefined;

	$: _step = step ?? (max - min) / 400;

	let prevY: number | null = null;

	const mousemove = (e: MouseEvent) => {
		if (prevY === null) return;
		const delta = prevY - e.clientY;
		let newValue = value + delta * _step;
		if (newValue < min) newValue = min;
		else if (newValue > max) newValue = max;
		if (typeof onChange === "undefined") value = newValue;
		else onChange(newValue);
		prevY = e.clientY;
	};

	const mousedown = (e: MouseEvent) => {
		window.addEventListener("mousemove", mousemove);
		prevY = e.clientY;
	};

	const mouseup = (e: MouseEvent) => {
		window.removeEventListener("mousemove", mousemove);
		prevY = null;
	};
</script>

{#if typeof prevY === "number"}
	<div
		class="top-0 left-0 fixed w-full h-full z-50 cursor-ns-resize select-none"
		on:mouseup={mouseup}
	></div>
{/if}
<button on:mousedown={mousedown} class="knob">
	<span
		style="--rotate: {(((value ?? 0) - (min ?? 0)) /
			((max ?? 1) - (min ?? 0))) *
			360}deg;"
		class="indicator"
	></span>
</button>

<style lang="postcss">
	.knob {
		@apply aspect-square rounded-full btn relative w-12;
	}
	.indicator {
		content: "";
		transform: rotate(calc(var(--rotate) - 180deg));
		transform-origin: 50% 200%;

		@apply block top-0 left-1/2 w-0.5 h-1/4 bg-red-400 absolute;
	}

	.realist-knob {
		box-shadow:
			inset 0 -3px 1px rgba(0, 0, 0, 0.2),
			inset 0 3px 1px rgba(255, 255, 255, 0.9),
			0px 0px rgba(0, 0, 0, 0.1),
			-0px 1px 2px rgba(0, 0, 0, 0.05),
			-1px 2px 2px rgba(0, 0, 0, 0.04737),
			-2px 3px 2px rgba(0, 0, 0, 0.04474),
			-3px 4px 2px rgba(0, 0, 0, 0.04211),
			-4px 5px 2px rgba(0, 0, 0, 0.03947),
			-5px 6px 2px rgba(0, 0, 0, 0.03684),
			-6px 7px 2px rgba(0, 0, 0, 0.03421),
			-7px 8px 2px rgba(0, 0, 0, 0.03158),
			-8px 9px 2px rgba(0, 0, 0, 0.02895),
			-9px 10px 2px rgba(0, 0, 0, 0.02632),
			-10px 11px 2px rgba(0, 0, 0, 0.02368),
			-11px 12px 2px rgba(0, 0, 0, 0.02105),
			-12px 13px 2px rgba(0, 0, 0, 0.01842),
			-13px 14px 2px rgba(0, 0, 0, 0.01579),
			-14px 15px 2px rgba(0, 0, 0, 0.01316),
			-15px 16px 2px rgba(0, 0, 0, 0.01053),
			-16px 17px 2px rgba(0, 0, 0, 0.00789),
			-17px 18px 2px rgba(0, 0, 0, 0.00526),
			-18px 19px 2px rgba(0, 0, 0, 0.00263),
			-19px 20px 2px transparent;
		@apply aspect-square rounded-full bg-neutral-200 relative w-12;
	}

	.realist-indicator {
		content: "";
		transform: rotate(calc(var(--rotate) - 180deg));
		transform-origin: 50% 200%;

		@apply block top-0 left-1/2 w-0.5 h-1/4 bg-red-400 absolute;
	}
</style>
