<script lang="ts">
	import { rhythms } from "../rhythms-instruments.store";
	import type { Rhythm } from "../types";

	export let rhythm: Rhythm;
	export let index: number;
</script>

<div class="flex flex-col">
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Arp:</span>
			<input
				type="checkbox"
				class="toggle toggle-sm"
				checked={rhythm.arp.enabled}
				on:change={(e) => {
					rhythms.update((oldRhythms) =>
						oldRhythms.map((r, j) =>
							j === index
								? {
										...r,
										arp: { ...r.arp, enabled: e.currentTarget.checked },
									}
								: r,
						),
					);
				}}
			/>
		</label>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Asc</span>
			<input
				type="checkbox"
				class="toggle toggle-sm"
				checked={rhythm.arp.dir === "desc"}
				on:change={(e) => {
					rhythms.update((oldRhythms) =>
						oldRhythms.map((r, j) =>
							j === index
								? {
										...r,
										arp: {
											...r.arp,
											dir: e.currentTarget.checked ? "desc" : "asc",
										},
									}
								: r,
						),
					);
				}}
			/>
			<span class="label-text">Desc</span>
		</label>
	</div>
</div>
