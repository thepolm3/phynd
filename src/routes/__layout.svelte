<script lang="ts">
	import '$root/styles/global.css'
</script>

<slot />

<style>
	:global(body) {
		background-color: var(--off-white);
		height: 100%;
	}

	:global(html) {
		height: 100%;
	}
</style>
