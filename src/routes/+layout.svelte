<script lang="ts">
	import '../styles/global.css';
	import Analytics from './Analytics.svelte';
</script>

<Analytics />

<slot />

<style>
	:global(a) {
		text-decoration: none;
		color: var(--black);
	}

	:global(body) {
		font-family: Arial, Helvetica, sans-serif;
		margin: 0;
		color: var(--black);
	}

	:root {
		--white: rgb(247, 247, 235);
		--bright-white: rgb(253, 253, 244);
		--black: #050505;
		--off-white: rgb(240, 240, 221);
		--accent-dark: #175535;
		--accent-light: #5a9367;
		--contrast-dark: #731963;
		--contrast-light: #b594b6;
	}
	:global(body) {
		background-color: var(--off-white);
		height: calc(100% - 2rem);
	}

	:global(html) {
		height: 100%;
		padding: 0;
		margin: 0;
	}
</style>
