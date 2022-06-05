<script lang="ts">
	import type { PlantPictureType } from '$root/types'

	export let picture: PlantPictureType
</script>

<a href="/img/full/{picture.path}"
	><div class="card">
		<img src="/img/thumbs/{picture.path}" alt={`${picture.type}`} loading="lazy" />
	</div></a
>

<style>
	img {
		max-width: 14rem;
		max-height: 14rem;
		border-radius: 2%;
		margin: 1rem;
		clip-path: polygon(0 5%, 0 95%, 5% 100%, 95% 100%, 100% 95%, 100% 5%, 95% 0%, 5% 0%);
	}

	.card {
		border-radius: 3px;
		border: 1px solid var(--accent-dark);
		display: grid;
		padding: 0.5rem;
		justify-items: center;
		background-color: var(--bright-white);
	}
	a {
		text-decoration: none;
		color: var(--accent-dark);
		font-weight: bold;
		font-size: 2ch;
	}
</style>
