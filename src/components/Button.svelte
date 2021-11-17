<script>
	import * as api from '../api';
	import { gameState, tilesState, minesState, revealedState } from '../store';

	const bet = async () => {
		const { status } = await api.clickBetButton();
		tilesState.set(Array.from(Array(25)));
		minesState.set([]);
		gameState.set(status);
	};

	const cashout = async () => {
		const { status, mines } = await api.clickCashoutButton();
		gameState.set(status);
		minesState.set(mines);

		tilesState.update((value) => {
			let newValue = [...value];

			return newValue.map((state, id) => {
				if (mines.includes(id)) {
					return 'mine';
				} else {
					return 'gem';
				}
			});
		});
	};
</script>

{#if $gameState === 'idle' || $gameState === 'cashout' || $gameState === 'busted'}
	<button class="button bet" on:click={() => bet()}>{'Bet'}</button>
{/if}

{#if $gameState === 'progress'}
	{#if $revealedState}
		<button class="button cashout" on:click={() => cashout()}>{'Cashout'}</button>
	{:else}
		<button class="button cashout" disabled on:click={() => cashout()}>{'Cashout'}</button>
	{/if}
{/if}

<style>
	.button {
		border-radius: 0.5em;
		margin: 3em;
		border: none;
		width: 12em;
		height: 3em;
		font-size: 1em;
	}
	.bet {
		background-color: rgb(31, 255, 32);
	}
	.cashout {
		background-color: rgb(255, 255, 0);
	}
</style>
