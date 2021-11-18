import { writable } from 'svelte/store';
import { initialTiles, isRevealed } from '../utils';

export const gameState = writable('idle');
export const tilesState = writable(initialTiles());
export const minesState = writable([]);
export const revealedState = writable(isRevealed(initialTiles()));
export const notSqueezedTiles = writable([]);
