<script lang="ts">
	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'

	import PlantSearchbar from '$root/components/plants/PlantSearchbar.svelte'
	import PlantThumb from '$root/components/plants/SearchCard.svelte'

	import type { PlantType } from '$root/types'

	export let plants: PlantType[]
	let title_hovered = false

	function titleHoverStart() {
		title_hovered = true
	}

	function titleHoverEnd() {
		title_hovered = false
	}

	let width: number

	$: if (width < 800 && plants != undefined) {
		window.scrollTo(0, document.body.scrollHeight)
	}
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
				<PlantSearchbar bind:plants />
				<!-- <button>Advanced</button> -->
			</div>
		</div>
	</div>
	<div class="plant-grid">
		{#if plants === undefined}
			<p>Error: Plants are undefined</p>
		{:else}
			{#each plants as plant (plant.id)}
				<a href={plant.url} animate:flip={{ duration: 500 }}>
					<PlantThumb {plant} />
				</a>
			{/each}
		{/if}
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
		background-color: var(--accent-dark);
		color: var(--white);
	}

	.plant-grid {
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
		.plant-grid {
			margin-left: 5rem;
			margin-right: 5rem;
		}
	}

	@media only screen and (max-width: 800px) {
		.content-order {
			flex-direction: column-reverse;
		}

		.plant-grid {
			flex-flow: row wrap-reverse;
			justify-content: center;
		}
	}
</style>
