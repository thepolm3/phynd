<script lang="ts">
	import type { PlantPictureType, PlantType } from '$root/types'

	export let picture: PlantPictureType
	let part = picture.plant_part
	let plant = part.plant
</script>

<article class="plant-card" id="plant_card_{picture.id.toString()}">
	<div class="plant-image-container">
		<img
			class="plant-image"
			src="/img/thumbs/{picture.thumbnail}"
			alt="{plant.colloquial_name} ({plant.genus} {plant.species})"
			loading="lazy"
		/>
	</div>
	<table>
		<tr><td>{plant.colloquial_name} ({part.name})</td></tr>
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
