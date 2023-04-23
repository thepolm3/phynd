<script lang="ts">
	import type { Plant } from '$root/types';
	import GalleryPicture from './GalleryPicture.svelte';

	export let data;
	let plant: Plant = data.plant;
</script>

<article>
	<div class="info-container">
		<h1>{plant.colloquial_name}</h1>
		<table class="attribution">
			<tr><th>Project: </th><td>{plant.project}</td></tr>
			<tr><th>Author: </th><td>{plant.author}</td></tr>
		</table>
		<table class="info-box">
			<tr><th>Descriptor:</th><td>{plant.descriptor}</td></tr>
			<tr><th>Family:</th><td>{plant.family}</td></tr>
			<tr><th>Genus:</th><td>{plant.genus}</td></tr>
			<tr><th>Species:</th><td>{plant.species}</td></tr>
			<tr><th>Category:</th><td>{plant.plant_kingdom}</td></tr>
		</table>
	</div>
	<div class="links">
		{#if plant.kew_photo}
			<a href={plant.kew_photo}>View Kew Photo</a>
		{/if}
		{#if plant.project_herbarium_link}
			<a href={plant.project_herbarium_link}>View Project Herbarium Page</a>
		{/if}
	</div>

	<div class="part-gallery">
		<h2>Gallery</h2>
		{#if plant.parts === undefined}
			<p>Error: No plant parts found</p>
		{:else}
			<div class="plant-parts">
				{#each plant.parts as part}
					<div class="part-heading">
						<h3 id={part.name}>{part.name}</h3>
					</div>
					<div class="part-section">
						{#each part.types as { name, pictures }}
							<div class="part-type">
								<h4 id={`${part.name}-${name.trim()}`}>{name}</h4>
								<div class="part-type-pics">
									{#each pictures as picture}
										<div class="part">
											<GalleryPicture {picture} {name} />
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</article>

<style>
	.info-container {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		padding-block: 2rem;
		background-color: var(--accent-light);
		color: var(--off-white);
	}

	.info-container th {
		text-align: right;
	}

	.info-container td {
		font-style: italic;
	}
	.links {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		padding: 1rem;
		background-color: var(--accent-light);
		color: var(--off-white);
	}

	.links > a {
		font-style: italic;
		color: var(--off-white);
		font-size: 3ch;
		text-decoration: underline;
	}

	h1 {
		font-size: 7ch;
		margin: 0rem;
	}

	h2 {
		grid-column: 1 / -1;
		margin: 0rem;
		font-size: 6ch;
		margin: auto;
		color: var(--accent-dark);
	}

	h3 {
		margin: 0;
		font-size: 5ch;
	}

	.part-heading {
		grid-column: 1 / -1;
		border-bottom: 1px solid var(--black);
		margin-bottom: 2rem;
		margin-top: 4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.part-gallery {
		display: grid;
		gap: 1rem;
		justify-content: center;
		padding: 2rem;
		border: 1px solid var(--black);
		margin-left: auto;
		margin-right: auto;
		margin-top: 4rem;
		width: 90%;

		background-color: var(--white);
	}

	.part-section {
		flex-wrap: wrap;
		gap: 1rem;
	}

	.part-type {
		display: grid;
		padding: 1rem;
		align-content: start;
		justify-items: center;
		grid-auto-flow: row;
	}

	.part-type-pics {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.part {
		display: flex;
	}

	@media only screen and (max-width: 800px) {
		.info-container {
			flex-direction: column;
			gap: 1rem;
			align-items: center;
		}

		h1 {
			text-align: center;
		}
	}
</style>
