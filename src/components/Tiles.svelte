<script lang="ts">
	import gem_icon from '../assets/gem.svg';
	import mine_icon from '../assets/mine.svg';
	import gem_audio from '../assets/gem.mp3';
	import mine_audio from '../assets/mine.mp3';

	import * as api from '../api';

	import { gameState, minesState, tilesState, revealedState } from '../store';

	const tile = async (id: number) => {
		const { status, mines } = await api.clickTile(id);
		gameState.set(status);

		if ($gameState === 'progress') {
			$tilesState[id] = 'gem';
			revealedState.set(true);
		}

		if ($gameState === 'busted' || $gameState === 'cashout') {
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
		}

		playAudio(id);
	};

	const playAudio = (id: number) => {
		let url = $tilesState[id] === 'gem' ? gem_audio : mine_audio;

		new Audio(url).play();
	};
</script>

<div class="grid-container" style="grid-template-columns: repeat(5,auto);">
	{#each { length: $tilesState.length } as _, id (id)}
		{#if $gameState === 'idle'}
			<button class="idle" on:click={() => alert('Click Bet button to start playing')} />
		{:else}
			<button class="in-progress" on:click={() => tile(id)}>
				{#if $tilesState[id] === 'gem'}
					<img src={gem_icon} alt="gem" />
				{/if}
				{#if $tilesState[id] === 'mine'}
					<img src={mine_icon} alt="mine" />
				{/if}
			</button>
		{/if}
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		width: 50%;
		height: 50%;
		grid-gap: 0.5em;
		background: rgb(15, 33, 46);
	}
	.grid-container button {
		border-radius: 0.5em;
		border: none;
		width: 8em;
		height: 8em;
		padding: 1.5em;
	}
	.idle {
		background: rgb(33, 55, 67);
	}
	.in-progress {
		background: rgb(54, 83, 99);
	}
</style>
