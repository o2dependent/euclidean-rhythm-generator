<script>
	import OctaveOffsetInput from "./OctaveOffsetInput.svelte";
	import SynthEnvelopeSettings from "./SynthEnvelopeSettings.svelte";
	import SynthOscillatorSettings from "./SynthOscillatorSettings.svelte";
	import SynthGeneralSettings from "./SynthGeneralSettings.svelte";
</script>

<div id="settings">
	<OctaveOffsetInput />
	<SynthGeneralSettings />
	<SynthOscillatorSettings />
	<SynthEnvelopeSettings />
</div>

<style lang="postcss">
	#settings {
		display: flex;
		flex-wrap: wrap;
		@apply bg-base-300 text-base-content;
	}
	:global(#settings > div) {
		padding: 0.5rem;
		@apply border-l border-r border-base-100;
	}
</style>
