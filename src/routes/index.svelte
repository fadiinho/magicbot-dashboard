<script lang="ts">
	import { onMount } from 'svelte';
	import socket, { initSocket } from '../socket';

	import MessagesDrawer from '../components/MessagesDrawer.svelte';
	import UserList from '../components/UserList.svelte';
	import type { IUser } from '../types';

	let selectedUserId = '';

	onMount(() => {
		initSocket();
	});

	const handleBlock = (event: CustomEvent<{ user: IUser; action: 'block' | 'unblock' }>) => {
		socket.emit('block_user', { user: event.detail.user, event: event.detail.action });
	};
</script>

<div class="container flex justify-evenly">
	<UserList
		on:userSelected={(user) => (selectedUserId = user.detail)}
		on:block={(user) => handleBlock(user)}
	/>
	<MessagesDrawer bind:selectedUserId />
</div>

<style>
	:global(body) {
		background-color: #00000f;
		min-height: 100vh;
		color: #fff;
	}
</style>
