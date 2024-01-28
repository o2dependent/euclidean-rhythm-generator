<script>
	import OctaveOffsetInput from "./OctaveOffsetInput.svelte";
	import SynthEnvelopeSettings from "./SynthEnvelopeSettings.svelte";
	import SynthOscillatorSettings from "./SynthOscillatorSettings.svelte";
	import SynthVolumeSettings from "./SynthVolumeSettings.svelte";
</script>

<div id="settings">
	<OctaveOffsetInput />
	<SynthVolumeSettings />
	<SynthOscillatorSettings />
	<SynthEnvelopeSettings />
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
