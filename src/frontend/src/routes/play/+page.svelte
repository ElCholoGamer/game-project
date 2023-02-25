<script lang="ts">
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte/types/runtime/internal/lifecycle';
	import { goto } from '$app/navigation';
	import { PLAYER_ID_COOKIE } from '$lib/constants';
	import { PUBLIC_WEBSOCKET_URL } from '$env/static/public';
	import { ClientOpCode } from 'common';

	onMount(() => {
		const playerId = Cookies.get(PLAYER_ID_COOKIE);
		if (!playerId) {
			goto('/');
			return;
		}

		const ws = new WebSocket(PUBLIC_WEBSOCKET_URL);
		ws.onopen = () => {
			ws.send(JSON.stringify({ op: ClientOpCode.LOG_IN, data: { id: playerId } }));
		};
	});
</script>
