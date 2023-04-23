<script lang="ts">
	import type { PlantPictureSearchResult } from '$root/types';

	export let picture: PlantPictureSearchResult;
</script>

<article class="plant-card">
	<div class="plant-image-container">
		{#if picture.thumbnail}
			<img
				class="plant-image"
				src="/img/thumbs/{picture.thumbnail}"
				alt="{picture.plant_name} ({picture.plant_genus} {picture.plant_species})"
				loading="lazy"
			/>
		{/if}
	</div>
	<table>
		<tr><td>{picture.plant_name} ({picture.part_name})</td></tr>
		<tr><td>{picture.type}</td></tr>
	</table>
</article>

<style>
	.plant-card {
		text-align: center;
		color: #001021;
		border-radius: 7px;
		width: 10.5rem;
		display: grid;
		margin: 0.5rem;
		background-color: var(--white);
		border: 1px solid var(--black);
	}

	.plant-image {
		max-width: 9rem;
		object-fit: fill;
		clip-path: polygon(0 5%, 0 95%, 5% 100%, 95% 100%, 100% 95%, 100% 5%, 95% 0%, 5% 0%);
	}

	.plant-image-container {
		border-radius: 5%;
		border: 0px solid var(--black);
		background-color: var(--white);
		width: 9rem;
		margin-top: 0.5rem;
		margin-inline: auto;
		align-content: center;
		justify-content: center;
		display: flex;
	}

	table {
		padding: 0.5rem;
		font-size: 1.5ch;
	}

	td {
		text-align: left;
		font-style: italic;
	}
</style>
