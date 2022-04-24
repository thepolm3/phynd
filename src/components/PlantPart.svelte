<script lang="ts">
	import type { PlantPartType, PlantType } from '$root/types'

	export let part: PlantPartType
</script>

<p>{part.name}</p>
<div class="picture-gallery">
	{#if part.pictures === undefined}
		<p>Error: Pictures are not defined</p>
	{:else}
		{#each part.pictures as picture}
			<img src="/img/{picture.path}" />
		{/each}
	{/if}
</div>

<style>
	.picture-gallery {
		display: subgrid;
		grid-template-columns: repeat(auto-fit, 13rem);
	}
</style>
