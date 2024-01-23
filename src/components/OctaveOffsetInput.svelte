<script lang="ts">
	export let octaveOffset: number;
	export let octavesShown: number;
</script>

<div class="flex flex-col gap-1">
	<p>Octave Offset</p>
	<div class="flex gap-1">
		<button
			on:click={() => (octaveOffset = octaveOffset - 1)}
			disabled={octaveOffset <= 1}
			type="button">-</button
		>
		<p>{octaveOffset}</p>
		<button
			on:click={() => (octaveOffset = octaveOffset + 1)}
			disabled={octaveOffset >= 11 - octavesShown}
			type="button">+</button
		>
	</div>
</div>
