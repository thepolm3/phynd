<script lang="js">
    import {browser} from "$app/environment";
    const searchParams = browser && $page.url.searchParams;

	import { onMount } from 'svelte';
    
	import autoComplete from '@tarekraafat/autocomplete.js';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let query = (searchParams && searchParams.get('q')) || '';
	export let plants;

	const config = {
		placeHolder: `Search ${plants.length} plants by Vernacular Name, Botanical Name, Genus, Family, etc.`,
		data: {
			src: plants,
			keys: ['search_string']
		},
		events: {
			input: {
				change: (/** @type {{ target: { value: any; }; }} */ input) => {
					const newUrl = new URL($page.url);
					newUrl?.searchParams?.set('q', input.target.value);
					goto(newUrl, { replaceState: true });
				},
				results: (/** @type {{ detail: { results: { value: any; }[]; }; }} */ event) => {
					plants = event.detail.results.map((/** @type {{ value: any; }} */ result) => {
						return result.value;
					});
				}
			}
		},
		threshold: 0,
		resultsList: false
	};

	onMount(async () => {
		const autoCompleteJS = new autoComplete(config);
		autoCompleteJS.start(query);
		let elem = document.getElementById('autoComplete');
        if (elem) {
            elem.setAttribute("disabled", "false");
        }
	});
</script>

<div id="plantAutoComplete">
	<input id="autoComplete" value={query} disabled />
</div>

<style>
	div {
		min-width: 40rem;
		min-height: 5rem;
	}

	:global(#plantAutoComplete .autoComplete_wrapper) {
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
		border: 0.05rem solid var(--accent-light);
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
		color: var(--accent-light);
		transition: all 0.3s ease;
		-webkit-transition: all -webkit-transform 0.3s ease;
	}

	input:hover::placeholder {
		color: var(--accent-light);
		transition: all 0.3s ease;
		-webkit-transition: all -webkit-transform 0.3s ease;
	}

	input:focus::placeholder {
		padding: 0.1rem 0.6rem;
		font-size: 0.95rem;
		color: var(--accent-light);
	}

	input:focus::selection {
		background-color: rgba(255, 122, 122, 0.15);
	}

	input::selection {
		background-color: rgba(255, 122, 122, 0.15);
	}

	input:hover {
		color: var(--accent-light);
		transition: all 0.3s ease;
		-webkit-transition: all -webkit-transform 0.3s ease;
	}

	input:focus {
		color: var(--accent-light);
		border: 0.06rem solid #5a9367;
	}

	:global(#plantAutoComplete .autoComplete_wrapper > ul) {
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
	}

	:global(#plantAutoComplete .autoComplete_wrapper > ul[hidden]),
	:global(#plantAutoComplete .autoComplete_wrapper > ul:empty) {
		display: block;
		opacity: 0;
		transform: scale(0);
	}

	:global(#plantAutoComplete .autoComplete_wrapper > ul > li) {
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

	:global(#plantAutoComplete .autoComplete_wrapper > ul > li mark) {
		background-color: transparent;
		color: var(--accent-light);
		font-weight: bold;
	}

	:global(#plantAutoComplete .autoComplete_wrapper > ul > li:hover) {
		cursor: pointer;
		background-color: var(--accent-dark);
	}

	:global(#plantAutoComplete .autoComplete_wrapper > ul > li[aria-selected='true']) {
		background-color: var(--accent-dark);
	}

	@media only screen and (max-width: 800px) {
		:global(#plantAutoComplete .autoComplete_wrapper > input) {
			width: 30rem;
		}

		div {
			min-width: 30rem;
			min-height: 5rem;
		}
	}
	@media only screen and (max-width: 600px) {
		:global(#plantAutoComplete .autoComplete_wrapper > input) {
			width: 20rem;
		}

		div {
			min-width: 20rem;
			min-height: 5rem;
		}
	}
</style>
