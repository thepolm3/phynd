<script lang="ts">
	import type { Plant } from '$root/types';

	export let plant: Plant;
</script>

<article class="plant-card" id="plant_card_{plant.id.toString()}">
	<div class="plant-title-container">
		<h3>{plant.colloquial_name}</h3>
	</div>
	<div class="plant-image-container">
		{#if plant.thumbnail}
            <img
                class="plant-image"
                src="/img/thumbs/{plant.thumbnail}"
                alt="{plant.colloquial_name} ({plant.genus} {plant.species})"
                loading="lazy"
            />
        {/if}
	</div>
	<table>
		{#if plant.family}
			<tr><th>Family:</th><td>{plant.family}</td></tr>
		{/if}
		{#if plant.genus}
			<tr><th>Genus:</th><td>{plant.genus}</td></tr>
		{/if}
		{#if plant.species}
			<tr><th>Species:</th><td>{plant.species}</td></tr>
		{/if}
		{#if plant.plant_kingdom}
			<tr><th>Category:</th><td>{plant.plant_kingdom}</td></tr>
		{/if}
	</table>
</article>

<style>
	.plant-card {
		text-align: center;
		color: #001021;
		border-radius: 7px;
		width: 10.5rem;
		display: grid;
		align-items: center;
		justify-items: center;
		margin: 0.5rem;
		background-color: var(--white);
		border: 1px solid var(--black);
	}

	.plant-image {
		border-radius: 5%;
		max-height: 9rem;
		max-width: 9rem;
		object-fit: fill;
	}

	.plant-image-container {
		border-radius: 5%;
		border: 0px solid var(--black);
		background-color: var(--white);
		height: 9rem;
		width: 9rem;
		align-content: center;
		justify-content: center;
		display: flex;
	}

	.plant-title-container {
		background-color: var(--accent-light);
		color: var(--white);
		width: 9.5rem;
		height: 4rem;
		border-radius: 3px 3px 0 0;
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 0.5rem 0 0.5rem;
	}
	table {
		padding: 0.5rem;
		font-size: 1ch;
		min-height: 5rem;
	}

	th {
		text-align: right;
		font-weight: bold;
	}

	td {
		text-align: left;
		font-style: italic;
	}
</style>
