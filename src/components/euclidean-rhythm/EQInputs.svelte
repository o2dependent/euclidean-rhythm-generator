<script lang="ts">
	import { EQ_DEFAULT } from "./consts";
	import { eqValues } from "./eq.store";

	$: low = $eqValues?.low ?? EQ_DEFAULT.low;
	$: mid = $eqValues?.mid ?? EQ_DEFAULT.mid;
	$: high = $eqValues?.high ?? EQ_DEFAULT.high;
	$: highFrequency = $eqValues?.highFrequency ?? EQ_DEFAULT.highFrequency;
	$: lowFrequency = $eqValues?.lowFrequency ?? EQ_DEFAULT.lowFrequency;

	const onSetEq = (key: keyof typeof EQ_DEFAULT) => (e: Event) => {
		const value = Number((e.target as HTMLInputElement).value);
		eqValues?.set({ ...$eqValues, [key]: value });
	};
</script>

<div class="flex gap-8 w-full">
	<div class="flex flex-col gap-2 w-28">
		<p>Bands</p>
		<div class="w-full h-96 grid grid-cols-3 items-end">
			<div class="relative w-full h-full">
				<input
					type="range"
					min={-200}
					max={200}
					class="range range-xs -rotate-90 w-96 origin-left absolute -bottom-2.5 left-1/2"
					value={low}
					on:change={onSetEq("low")}
					on:input={onSetEq("low")}
				/>
			</div>
			<div class="relative w-full h-full">
				<input
					type="range"
					min={-200}
					max={200}
					class="range range-xs -rotate-90 w-96 origin-left absolute -bottom-2.5 left-1/2"
					value={mid}
					on:change={onSetEq("mid")}
					on:input={onSetEq("mid")}
				/>
			</div>
			<div class="relative w-full h-full">
				<input
					type="range"
					min={-200}
					max={200}
					class="range range-xs -rotate-90 w-96 origin-left absolute -bottom-2.5 left-1/2"
					value={high}
					on:change={onSetEq("high")}
					on:input={onSetEq("high")}
				/>
			</div>
		</div>
		<div class="w-full grid grid-cols-3 place-items-center text-center">
			<p>Low</p>
			<p>Mid</p>
			<p>High</p>
		</div>
	</div>
	<div class="flex flex-col gap-2 w-20">
		<p>Frequency</p>
		<div class="w-full h-96 grid grid-cols-2 items-end">
			<div class="relative w-full h-full">
				<input
					type="range"
					min={0}
					max={2200}
					class="range range-xs -rotate-90 w-96 origin-left absolute -bottom-2.5 left-1/2"
					value={lowFrequency}
					on:change={onSetEq("lowFrequency")}
					on:input={onSetEq("lowFrequency")}
				/>
			</div>
			<div class="relative w-full h-full">
				<input
					type="range"
					min={0}
					max={2200}
					class="range range-xs -rotate-90 w-96 origin-left absolute -bottom-2.5 left-1/2"
					value={highFrequency}
					on:change={onSetEq("highFrequency")}
					on:input={onSetEq("highFrequency")}
				/>
			</div>
		</div>
		<div class="w-full grid grid-cols-2 place-items-center text-center">
			<p>Low</p>
			<p>High</p>
		</div>
	</div>
</div>
