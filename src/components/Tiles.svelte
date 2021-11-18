<script lang="ts">
	import gem from '../assets/gem.svg';
	import mine from '../assets/mine.svg';
	import gem_audio from '../assets/gem.mp3';
	import mine_audio from '../assets/mine.mp3';

	import * as api from '../api';

	import { gameState, minesState, tilesState, revealedState, notSqueezedTiles } from '../store';

	const tile = async (id: number) => {
		const { status, mines } = await api.clickTile(id);

		gameState.set(status);
		$tilesState[id].squeeze = false;

		if ($gameState === 'progress') {
			$tilesState[id].type = 'gem';
			revealedState.set(true);
		}

		if ($gameState === 'busted' || $gameState === 'cashout') {
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
		}

		$notSqueezedTiles.push(id);

		playAudio(id);
	};

	const playAudio = (id: number) => {
		let url = $tilesState[id].type === 'gem' ? gem_audio : mine_audio;

		new Audio(url).play();
	};
</script>

<div class="grid-container" style="grid-template-columns: repeat(5,auto);">
	{#each { length: $tilesState.length } as _, id (id)}
		<button
			disabled={$gameState === 'progress' ? false : true}
			class="tile"
			on:click={() => tile(id)}
		>
			{#if $tilesState[id].type === 'gem'}
				{#if !$tilesState[id].squeeze}
					<img src={gem} alt="gem" />
				{:else}
					<img class="squeezed" src={gem} alt="gem" />
				{/if}
			{/if}

			{#if $tilesState[id].type === 'mine'}
				{#if !$tilesState[id].squeeze}
					<img src={mine} alt="mine" />
				{:else}
					<img class="squeezed" src={mine} alt="mine" />
				{/if}
			{/if}
		</button>
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-gap: 0.5em;
	}
	.grid-container button {
		border-radius: 0.5em;
		border: none;
		width: 120px;
		height: 120px;
		padding: 1em;
	}
	.tile {
		background: rgb(54, 83, 99);
	}
	.squeezed {
		height: 60px;
		width: 60px;
		padding: 12px;
		background: rgb(33, 55, 67);
		border-radius: 2.5em;
	}
</style>
