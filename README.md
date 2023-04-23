# About

The PHYND website was created as part of a Masters project undertaken at Bournemouth University in 2021/22. It sets out to provide an open access photographic database for phytoliths found in plants of various ecosystems of the British Isles. The ecosystems explored so far contain phytolith photographs of plants from agricultural crops, lowland heath and acid grassland. The project is a work in progress and feedback about content, ease of use and applicability should be sent to contributions@phynd.online

# Contributing

## Phytolith samples & other projects

Please email contributions@phynd.online in order to contribute samples from your own projects for other researchers to browse

## Code Contributions

The project requirs [node](https://nodejs.org/en/) alongside your desired package manager such as [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/). Download the project then run
`npm i` or `yarn install`
to install. The project uses [SvelteKit](https://kit.svelte.dev/), as well as [Eslint](https://eslint.org) for linting.
run `npm run dev` or equivalent to get started.

The project has a number of large image files, so the download may take some time.

All of the images are found at high quality in the /img directory.

Before running `npm run build` you should run `npm run generate` in order to ensure that you have a populated `src/plants.json` file as well as a `static/img` folder, bot of which are required to build the website. `npm run generate` does a lot of image manipulation, so can take a long time. If you wish to batch generating the images for any reason, you can run `node src/generate/thumbnails.js {start} {end}` to generate a subset of the images

# Planned development

Currently the development is a side project, and for the purposes of the Masters Thesis the website is complete. Nevertheless, given more development time the following are planned:

- Generalising the building of source data to allow other contributers to submit flat files with data as pull requests
- Paginating the search results for better load time and improved extensibility
- Spending more time on the aesthetic look and usability of the website, including a11y accessiblity
- An advanced search feature, allowing you to more directly select what you are looking for
- Docker support for reproducibility
