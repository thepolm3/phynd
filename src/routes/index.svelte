<script lang="ts">
	import { fade } from 'svelte/transition'

	let width: number
</script>

<svelte:window bind:innerWidth={width} />

<div class="container">
	<div class="title">
		<div class="heading">
			<h1><abbr title="Phytolith Nomenclature Database">PhyND</abbr></h1>
			<h2>
				<a href="https://en.wikipedia.org/wiki/Phytolith"><b>Phy</b>tolith</a>
				<b>N</b>omenclature
				<b>D</b>atabase
			</h2>
		</div>
		<div class="navigation">
			<a id="plant-search" href="plant-search">Search by Plant</a>
			<a id="picture-search" href="picture-search">Search by Picture</a>
		</div>
	</div>
</div>

<style>
	.container {
		display: grid;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.navigation {
		display: flex;
		justify-content: space-between;
		grid-auto-flow: row;
		min-width: 50rem;
		margin-bottom: 12rem;
	}

	.title {
		display: grid;
		gap: 3rem;
	}

	.heading {
		display: grid;
		justify-content: center;
	}

	h1 {
		display: grid;
		justify-content: center;
	}

	h1 > abbr {
		font-size: 5ch;
	}

	.heading > h2 {
		color: var(--black);
		margin: 0;
	}

	.heading > h2 > a {
		color: var(--black);
	}

	.heading > h2 > a:visited {
		color: var(--black);
	}

	.navigation > a {
		text-decoration: none;
		font-size: 3ch;
		font-weight: bold;
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 2px 2px 1px var(--black);
	}

	#plant-search {
		color: var(--bright-white);
		background-color: var(--accent-light);
	}

	#plant-search:hover {
		background-color: var(--accent-dark);
	}

	#picture-search {
		color: var(--bright-white);
		background-color: var(--contrast-light);
	}

	#picture-search:hover {
		background-color: var(--contrast-dark);
	}
</style>
