<script lang="ts">
	import { octaveOffset, octavesShown } from "@/lib/piano/octaves.store";
</script>

<div class="flex flex-col gap-1">
	<p>Octave Offset</p>
	<div class="flex gap-1 items-center">
		<button
			class="btn"
			on:click={() => octaveOffset.set($octaveOffset - 1)}
			disabled={$octaveOffset <= 1}
			type="button">-</button
		>
		<p>{$octaveOffset}</p>
		<button
			class="btn"
			on:click={() => octaveOffset.set($octaveOffset + 1)}
			disabled={$octaveOffset >= 11 - $octavesShown}
			type="button">+</button
		>
	</div>
</div>
