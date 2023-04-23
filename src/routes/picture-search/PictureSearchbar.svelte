<script lang="ts">
    import {browser} from "$app/environment";
    const searchParams = browser && $page.url.searchParams

	import { onMount } from 'svelte';

	import autoComplete from '@tarekraafat/autocomplete.js';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: query = (searchParams && searchParams.get('q')) || '';
	let input;
	let autoCompleteJS;
	export let pictures;

	const config = {
		placeHolder: `Search ${pictures.length} images by Phytolith Type, Plant Name, or Plant Part`,
		data: {
			src: pictures,
			keys: ['search_string']
		},
		events: {
			input: {
				change: (/** @type {{ target: { value: string; }; }} */ input) => {
					const newUrl = new URL($page.url);
					newUrl?.searchParams?.set('q', input.target.value);
					goto(newUrl, { replaceState: true });
				},
				results: (/** @type {{ detail: { results: any[]; }; }} */ event) => {
					pictures = event.detail.results.map((result) => {
						return result.value;
					});
				}
			}
		},
		threshold: 0,
		resultsList: false
	};

	onMount(async () => {
		autoCompleteJS = new autoComplete(config);
		input.disabled = false;
		autoCompleteJS.start(input.value);
	});
</script>

<div id="pictureAutoComplete">
	<input id="autoComplete" value={query} disabled bind:this={input} />
</div>

<style>
	div {
		min-width: 40rem;
		min-height: 5rem;
	}

	:global(#pictureAutoComplete .autoComplete_wrapper) {
		display: inline-block;
		position: relative;
	}

	input {
		height: 3rem;
		width: 40rem;
		margin: 0;
		padding: 0 2rem 0 3.2rem;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		font-size: 1rem;
		text-overflow: ellipsis;
		outline: none;
		border-radius: 10rem;
		border: 0.05rem solid var(--contrast-light);
		background-image: url(/img/search.png);
		background-size: 1.4rem;
		background-position: left 1.05rem top 0.8rem;
		background-repeat: no-repeat;
		background-origin: border-box;
		background-color: var(--white);
		transition: all 0.4s ease;
		-webkit-transition: all -webkit-transform 0.4s ease;
	}

	input::placeholder {
		color: var(--contrast-light);
		transition: all 0.3s ease;
		-webkit-transition: all -webkit-transform 0.3s ease;
	}

	input:hover::placeholder {
		color: var(--contrast-light);
		transition: all 0.3s ease;
		-webkit-transition: all -webkit-transform 0.3s ease;
	}

	input:focus::placeholder {
		padding: 0.1rem 0.6rem;
		font-size: 0.95rem;
		color: var(--contrast-light);
	}

	input:focus::selection {
		background-color: rgba(255, 122, 122, 0.15);
	}

	input::selection {
		background-color: rgba(255, 122, 122, 0.15);
	}

	input:hover {
		color: var(--contrast-light);
		transition: all 0.3s ease;
		-webkit-transition: all -webkit-transform 0.3s ease;
	}

	input:focus {
		color: var(--contrast-light);
		border: 0.06rem solid #5a9367;
	}

	/* ul {
		position: absolute;
		max-height: 226px;
		overflow-y: scroll;
		box-sizing: border-box;
		left: 0;
		right: 0;
		margin: 0.5rem 0 0 0;
		padding: 0;
		z-index: 1;
		list-style: none;
		border-radius: 0.6rem;
		background-color: #fff;
		border: 1px solid var(--black);
		box-shadow: 0 3px 6px var(--black);
		outline: none;
		transition: opacity 0.15s ease-in-out;
		-moz-transition: opacity 0.15s ease-in-out;
		-webkit-transition: opacity 0.15s ease-in-out;
	} */

	:global(#pictureAutoComplete .autoComplete_wrapper > ul[hidden]),
	:global(#pictureAutoComplete .autoComplete_wrapper > ul:empty) {
		display: block;
		opacity: 0;
		transform: scale(0);
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > ul > li) {
		margin: 0.3rem;
		padding: 0.3rem 0.5rem;
		text-align: left;
		font-size: 1rem;
		color: #212121;
		border-radius: 0.35rem;
		background-color: var(--black);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: all 0.2s ease;
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > ul > li mark) {
		background-color: transparent;
		color: var(--contrast-light);
		font-weight: bold;
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > ul > li:hover) {
		cursor: pointer;
		background-color: var(--contrast-dark);
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > ul > li[aria-selected='true']) {
		background-color: var(--contrast-dark);
	}

	@media only screen and (max-width: 800px) {
		:global(#pictureAutoComplete .autoComplete_wrapper > input) {
			width: 30rem;
		}

		div {
			min-width: 30rem;
			min-height: 5rem;
		}
	}
	@media only screen and (max-width: 600px) {
		:global(#pictureAutoComplete .autoComplete_wrapper > input) {
			width: 20rem;
		}

		div {
			min-width: 20rem;
			min-height: 5rem;
		}
	}
</style>
