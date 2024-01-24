<script>
	import OctaveOffsetInput from "./OctaveOffsetInput.svelte";
	import WaveChanger from "./WaveChanger.svelte";
</script>

<div id="settings">
	<OctaveOffsetInput />
	<WaveChanger />
</div>

<style lang="postcss">
	#settings {
		display: flex;
		flex-wrap: wrap;
		@apply bg-slate-300;
	}
	:global(#settings > div) {
		padding: 0.5rem;
		@apply border-l border-r border-slate-500;
	}
</style>
