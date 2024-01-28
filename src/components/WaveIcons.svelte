<script lang="ts">
	export let type: "triangle" | "sine" | "square" | "sawtooth";
</script>

{#if type === "triangle"}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		id="mdi-triangle-wave"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		><path
			d="M22 12L17 22L7.1 6.04L4.24 12H2L7 2L16.9 17.96L19.76 12H22Z"
		/></svg
	>
{:else if type === "square"}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		id="mdi-square-wave"
		width="24"
		height="24"
		viewBox="0 0 24 24"><path d="M2 2V12H4V4H11V22H22V12H20V20H13V2H2Z" /></svg
	>
{:else if type === "sine"}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		id="mdi-sine-wave"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		><path
			d="M16.5,21C13.5,21 12.31,16.76 11.05,12.28C10.14,9.04 9,5 7.5,5C4.11,5 4,11.93 4,12H2C2,11.63 2.06,3 7.5,3C10.5,3 11.71,7.25 12.97,11.74C13.83,14.8 15,19 16.5,19C19.94,19 20.03,12.07 20.03,12H22.03C22.03,12.37 21.97,21 16.5,21Z"
		/></svg
	>
{:else if type === "sawtooth"}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		id="mdi-sawtooth-wave"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		><path d="M11 22V6.83L2 16V13.17L13 2V17.17L22 8V10.83L11 22Z" /></svg
	>
{/if}
