<script lang="ts">
	import { onMount } from 'svelte'
	//@ts-ignore
	import autoComplete from '@tarekraafat/autocomplete.js'

	import type { PlantPictureType, PlantType } from '$root/types'

	export let pictures: PlantPictureType[]

	const config = {
		placeHolder: `Search ${pictures.length} entries by plant name, part, or type`,
		data: {
			src: pictures,
			keys: ['search_string']
		},
		trigger: (_: any) => {
			return true
		},
		events: {
			input: {
				results: (event: any) => {
					pictures = event.detail.results.map((result: any) => {
						return result.value
					})
				}
			}
		},
		resultsList: false
	}

	onMount(async () => {
		const autoCompleteJS = new autoComplete(config)
		autoCompleteJS.start()
	})
</script>

<div id="pictureAutoComplete">
	<input id="autoComplete" />
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

	:global(#pictureAutoComplete .autoComplete_wrapper > input) {
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

	:global(#pictureAutoComplete .autoComplete_wrapper > input::placeholder) {
		color: var(--contrast-light);
		transition: all 0.3s ease;
		-webkit-transition: all -webkit-transform 0.3s ease;
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > input:hover::placeholder) {
		color: var(--contrast-light);
		transition: all 0.3s ease;
		-webkit-transition: all -webkit-transform 0.3s ease;
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > input:focus::placeholder) {
		padding: 0.1rem 0.6rem;
		font-size: 0.95rem;
		color: var(--contrast-light);
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > input:focus::selection) {
		background-color: rgba(255, 122, 122, 0.15);
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > input::selection) {
		background-color: rgba(255, 122, 122, 0.15);
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > input:hover) {
		color: var(--contrast-light);
		transition: all 0.3s ease;
		-webkit-transition: all -webkit-transform 0.3s ease;
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > input:focus) {
		color: var(--contrast-light);
		border: 0.06rem solid #5a9367;
	}

	:global(#pictureAutoComplete .autoComplete_wrapper > ul) {
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
