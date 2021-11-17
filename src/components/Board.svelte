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
		grid-template-columns: minmax(0, 20em);
		background-color: rgb(15, 33, 46);
		padding: 2rem;
	}
</style>
