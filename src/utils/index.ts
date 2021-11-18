export interface Tile {
	type: undefined | string;
	squeeze: boolean;
}

export const initialTiles = () => {
	const createTiles: Array<Tile> = new Array(25);

	for (let i = 0; i < createTiles.length; i++) {
		createTiles[i] = {
			type: undefined,
			squeeze: true
		};
	}

	return createTiles;
};

export const isRevealed = (tiles: Array<Tile>) => {
	return tiles.some((tile) => tile.type !== undefined);
};
