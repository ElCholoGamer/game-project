<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import Spinner from '$lib/components/Spinner.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { MAX_USERNAME_LENGTH, PLAYER_ID_COOKIE } from '$lib/constants';
	import { generateRandomUsername } from '$lib/random';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import Cookies from 'js-cookie';

	let loading = false;
	let placeholderName = '...';
	let username = '';

	onMount(() => {
		placeholderName = generateRandomUsername();
	});

	const handleSubmit = () => {
		loading = true;

		axios
			.post(`${PUBLIC_SERVER_URL}/players`, { username })
			.then(res => {
				Cookies.set(PLAYER_ID_COOKIE, res.data.id, {
					expires: new Date(Date.now() + 15 * 60 * 1000),
					sameSite: 'strict',
				});
				goto('/play');
			})
			.catch(console.error)
			.finally(() => {
				loading = false;
			});
	};

	$: if (username.length > MAX_USERNAME_LENGTH) {
		username = username.substring(0, MAX_USERNAME_LENGTH);
	}
</script>

<h1
	class="text-center font-bold text-5xl sm:text-7xl my-8 font-display animate-hover-slow drop-shadow-md white-stroke"
>
	¡Atrapados!
</h1>

<form class="text-center my-12 py-12" on:submit|preventDefault={handleSubmit}>
	<p class="text-2xl font-bold">Elige el nombre que usarás:</p>
	<TextInput
		class="text-center w-60 my-8"
		placeholder={placeholderName}
		disabled={loading}
		bind:value={username}
	/>
	<br />
	<Button type="submit" disabled={loading || !username} class="my-4 text-3xl" color="green">
		<span class:text-transparent={loading}>Jugar</span>
		{#if loading}
			<span
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center"
				><Spinner /></span
			>
		{/if}
	</Button>
</form>
