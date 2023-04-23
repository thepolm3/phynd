<script lang="ts">
	import PictureSearchbar from './PictureSearchbar.svelte';

	import type { PlantPictureSearchResult } from '$root/types';
	import PictureThumb from './PictureThumb.svelte';

	export let data;
	let pictures: PlantPictureSearchResult[] = data.pictures;

	let width: number;
</script>

<svelte:window bind:innerWidth={width} />
<svelte:head>
	<title>Phynd</title>
</svelte:head>
<div class="content-order">
	<div class="banner">
		<div class="search-bar">
			<a href="/">
				<div class="heading">
					<h1><abbr title="Phytolith Nomenclature Database">PhyND</abbr></h1>
				</div>
			</a>
			<div>
				<PictureSearchbar bind:pictures />
				<!-- <button>Advanced</button> -->
			</div>
		</div>
	</div>
	<div class="picture-grid">
		{#each pictures as picture (picture.id)}
			<a href={picture.url}>
				<PictureThumb {picture} />
			</a>
		{/each}
	</div>
</div>

<style>
	.content-order {
		display: flex;
		flex-direction: column;
	}
	.banner {
		display: grid;
		justify-content: center;
		flex-direction: column;
		margin-top: 0;
		padding: 0rem;
		background-color: var(--contrast-dark);
		color: var(--white);
	}

	.picture-grid {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
	}

	a {
		text-decoration: none;
	}

	.heading {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		padding: 0.5rem 1rem 0.5rem 1rem;
		margin-top: 2rem;
	}

	.heading > h1 {
		margin: 0;
		color: var(--white);
	}

	@media only screen and (min-width: 800px) {
		.picture-grid {
			margin-left: 5rem;
			margin-right: 5rem;
		}
	}

	@media only screen and (max-width: 800px) {
		/* .content-order {
			flex-direction: column-reverse;
		} */

		.picture-grid {
			flex-flow: row wrap-reverse;
			justify-content: center;
		}
	}
</style>
