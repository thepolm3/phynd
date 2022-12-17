<script lang="ts">
	let width: number
</script>

<svelte:window bind:innerWidth={width} />
<div class="margin">
	<div class="container">
		<div class="row">
			<div class="title">
				<div class="heading">
					<h1><abbr title="Phytolith Nomenclature Database">PhyND</abbr></h1>
					<h2>
						<a href="https://en.wikipedia.org/wiki/Phytolith"><b>Phy</b>tolith</a>
						<b>N</b>omenclature
						<b>D</b>atabase for British Flora
					</h2>
				</div>
				<div class="subheading">
					An open access database for phytolith identification of British Flora
				</div>
			</div>
			<div class="navigation">
				<a id="plant-search" href="plant-search">Search by Plant</a>
				<a id="picture-search" href="picture-search">Search by Phytolith Type</a>
			</div>
		</div>
		<div class="row" id="lower-row">
			<div class="info-container">
				<h2>Info</h2>
				<ul class="info">
					<li><a href="about">About</a></li>
					<li><a href="projects">Projects</a></li>
					<li><a href="contributors">Contributors</a></li>
				</ul>
			</div>

			<div id="map" />
            <footer>
                <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
            </footer>
		</div>
	</div>
</div>
<style>

	a {
		text-decoration: none;
		color: var(--black);
	}

	.margin {
		margin-inline: 2rem;
		height: 100%;
	}

	.info-container {
		padding: 1rem;
		border: 1px dashed gray;
		display: block;
	}
	.container {
		display: grid;
		width: min(60rem, 100%);
		margin-inline: auto;
		align-content: space-between;
		margin-block: min(10%, 2rem);
		height: max(80%, 100% - 4rem);
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 1rem;
	}

	#lower-row {
		align-items: end;
	}

	.title {
		width: 22rem;
		gap: 1rem;
		display: grid;
	}

	.navigation {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: right;
		align-items: center;
	}

	@media only screen and (max-width: 800px) {
		.row {
			flex-direction: column;
		}

		.navigation {
			justify-content: center;
		}
	}

	#map {
		height: 300px;
	}

	h1 {
		margin-block: 0;
	}

	h1 > abbr {
		font-size: 3ch;
	}

	.heading > h2 {
		padding-block: 0.5rem;
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
		width: 13.5rem;
		text-decoration: none;
		font-size: 2ch;
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
