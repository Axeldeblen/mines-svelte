<script>
	import * as api from '../api';
	import { gameState, tilesState, minesState, notSqueezedTiles } from '../store';
	import { initialTiles, isRevealed } from '../utils';

	const bet = async () => {
		const { status } = await api.clickBetButton();
		tilesState.set(initialTiles());
		minesState.set([]);
		gameState.set(status);
		notSqueezedTiles.set([]);
	};

	const cashout = async () => {
		const { status, mines } = await api.clickCashoutButton();
		gameState.set(status);
		minesState.set(mines);

		tilesState.update((value) => {
			let tiles = [...value];

			return tiles.map((tile, id) => {
				if (!$notSqueezedTiles.includes(id)) {
					if ($minesState.includes(id)) {
						return { type: 'mine', squeeze: $tilesState[id].squeeze };
					} else {
						return { type: 'gem', squeeze: $tilesState[id].squeeze };
					}
				} else {
					return { type: `${$tilesState[id].type}`, squeeze: $tilesState[id].squeeze };
				}
			});
		});
	};
</script>

{#if $gameState === 'idle' || $gameState === 'cashout' || $gameState === 'busted'}
	<button class="button bet" on:click={() => bet()}>{'Bet'}</button>
{/if}

{#if $gameState === 'progress'}
	<button class="button cashout" disabled={!isRevealed($tilesState)} on:click={() => cashout()}
		>{'Cashout'}</button
	>
{/if}

<style>
	.button {
		border-radius: 0.5em;
		margin-top: 2em;
		border: none;
		width: 12em;
		height: 3em;
		font-size: 1em;
		justify-self: center;
	}
	.bet {
		background-color: rgb(31, 255, 32);
	}
	.cashout {
		background-color: rgb(255, 255, 0);
	}
</style>
