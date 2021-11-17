import * as api from '../api/api';

type Tile = { tile: number };
type Mines = { mines: Array<number> };
type Progress = { status: 'progress' };
type Reveal = Progress & Tile;
type Busted = { status: 'busted' } & Tile & Mines;
type Cashout = { status: 'cashout' } & Mines;

export async function clickBetButton(): Promise<Progress> {
	const { state } = await api.minesBet();

	if (state === 'progress') return { status: 'progress' };
	throw new Error('The game is not started.');
}

export async function clickTile(tile: number): Promise<Reveal | Busted> {
	const { state, mines } = await api.minesNext(tile);

	if (state === 'progress') return { status: 'progress', tile };
	if (state === 'busted') return { status: 'busted', mines, tile };
	throw new Error('The game state is not in progress or busted');
}

export async function clickCashoutButton(): Promise<Cashout> {
	const { state, mines } = await api.minesCashout();

	if (state === 'cashout') return { status: 'cashout', mines: mines };
	throw new Error('Cashout is not available');
}
