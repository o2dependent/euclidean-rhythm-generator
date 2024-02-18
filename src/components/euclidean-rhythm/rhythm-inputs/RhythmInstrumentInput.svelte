<script lang="ts">
	import type { ChangeEventHandler } from "svelte/elements";
	import { INSTRUMENT_TYPES } from "../consts";
	import { changeInstrument, instruments } from "../rhythms-instruments.store";

	export let index: number;

	const onChangeInstrument: ChangeEventHandler<HTMLSelectElement> = (e) => {
		const type = (e.target as HTMLSelectElement)
			.value as (typeof INSTRUMENT_TYPES)[number];
		changeInstrument(index, type);
	};

	const formatInstrumentName = (name: (typeof INSTRUMENT_TYPES)[number]) =>
		name
			?.split?.("/")
			?.slice(-2)
			.map((s) => s?.replace(/\(([^)]+)\)/, "").replace(".wav", ""))
			.join("/");
</script>

<div class="flex flex-col">
	<select
		class="h-8 flex items-center bg-transparent px-2 appearance-none w-max justify-center rounded-sm inset-box"
		value={$instruments?.[index]?.name ?? INSTRUMENT_TYPES[0]}
		on:change={onChangeInstrument}
	>
		{#each INSTRUMENT_TYPES as instrument}
			<option value={instrument}>{formatInstrumentName(instrument)}</option>
		{/each}
	</select>
</div>
