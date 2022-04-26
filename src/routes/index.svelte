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
	<footer>
		<p>
			The PHYND website was created as part of a Masters project undertaken at Bournemouth
			University in 2021/22. It sets out to provide an open access photographic database for
			phytoliths found in plants of various ecosystems of the British Isles. The ecosystems explored
			so far contain phytolith photographs of plants from agricultural crops, lowland heath and acid
			grassland. The project is a work in progress and feedback about content, ease of use and
			applicability should be sent to <b>s5117147 [at] bournemouth.ac.uk</b>
		</p>
		<p>
			The photographic data was created by Sigrid Osborne, a masters student at Bournemouth
			University. Joshua Osborne undertook the web design and is continuing to update and improve
			the site. Sigrid would like to acknowledge the support of <a
				href="https://www.butserancientfarm.co.uk">Butser Ancient Farm</a
			>,
			<a
				href="https://www.nationaltrust.org.uk/studland-bay/lists/national-trust-treasures-in-purbeck"
				>The National Trust</a
			> and the Pitman family for allowing access to their land for plant collecting and Dr. S. Elliott
			and Dr. E. Karoune for their training in phytolith processing, phytolith analysis and approaches
			to fieldworking practices.
		</p>
	</footer>
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
		gap: 10rem;
		grid-auto-flow: row;
		margin-bottom: 12rem;
		text-align: center;
	}

	.title {
		display: grid;
		justify-content: center;
		align-items: center;
		gap: 3rem;
	}

	.heading {
		display: grid;
		justify-content: center;
	}

	footer {
		margin: auto;
		width: min(90rem, 80%);
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

	@media only screen and (max-width: 800px) {
		.navigation {
			flex-direction: column;
			gap: 3rem;
			margin-bottom: 2rem;
		}
	}
</style>
