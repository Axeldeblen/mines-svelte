import { writable } from 'svelte/store';

export const gameState = writable('idle');
export const tilesState = writable(Array.from(Array(25)));
export const minesState = writable([]);
export const revealedState = writable(false);
