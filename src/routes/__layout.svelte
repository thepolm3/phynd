<script lang="ts">
	import '$root/styles/global.css'
</script>

<slot />

<style>
	:global(body) {
		background-color: var(--off-white);
		height: calc(100% - 2rem);
	}

	:global(html) {
		height: 100%;
		padding: 0;
		margin: 0;
	}

	:global(a) {
		text-decoration: none;
		color: var(--black);
	}
</style>
