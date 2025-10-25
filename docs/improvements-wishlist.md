# Potential improvements wishlist

> [!NOTE]  
> _These are just broad ideas that may or may not be incorporated in the future_.

## Fixes :

- [ ] Add `plusjams compile` examples

## Styling / UI / UX :

- [ ] <mark>Option for ink TUI to execute commands via a user interface.</mark>

## Features / Functionality :

- [ ] <mark>A development server / watcher daemon to automatically compile individual C++ source files when a change gets saved.</mark>

## Development Tasks :

- [ ] <mark>Make the project available via the [npmjs.com](https://www.npmjs.com/).</mark>
- [ ] <mark>Have a dedicated web-page to serve as an introduction and documentation guide for the project. Preferrably the use [Astro.js](https://astro.build/) or [Starlight](https://starlight.astro.build/) (by Astro) as a frontend framework, and host for free on github.</mark>
- [ ] <mark>Test cases using Vitest.</mark>
- [ ] Have a CI/CD
  - [ ] Automatically run the tests and bump the version.
  - [ ] Code signing for application distribution.
- [ ] Make licenses of packages I've depended on accessible to the user
  - [ ] Create a Node script to automatically list direct and indirect dependency licenses using `pnpm licenses list --json > licenses.json`. The script should then copy out all available licenses into a `licences` folder.
