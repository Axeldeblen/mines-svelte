<script>
	import Button from '../components/Button.svelte';
	import Tiles from '../components/Tiles.svelte';
</script>

<div class="board-container">
	<Tiles />
	<Button />
</div>

<style>
	.board-container {
		display: grid;
		background-color: rgb(15, 33, 46);
		padding: 2rem;
		height: 720px;
		width: 630px;
		border-radius: 1em;
	}
</style>
