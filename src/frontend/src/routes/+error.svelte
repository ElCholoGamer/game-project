<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';

	const notFound = $page.status === 404;
</script>

<main class="text-center">
	<h1 class="text-4xl sm:text-5xl font-display white-stroke my-8">
		{notFound ? 'Página no encontrada :(' : 'Algo salió mal...'}
	</h1>
	<p class="text-2xl sm:text-3xl sm:my-16">
		{notFound ? '(¿Cómo llegaste aquí?)' : ':/'}
	</p>
	<div class="my-8 grid grid-rows-2 w-36 sm:w-40 mx-auto">
		<Button class="my-3 text-xl sm:text-2xl" href="/">Inicio</Button>
		<Button class="my-3 text-xl sm:text-2xl" on:click={() => history.back()}>Regresar</Button>
	</div>
</main>
