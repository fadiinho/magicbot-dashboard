<script lang="ts">
	import { users, messages } from '../stores';
	import type { IUser } from '../types';
	import User from './User.svelte';

	const handleRemove = (_user: IUser) => {
		users.removeUser(_user);
		messages.removeAllUserMessages(_user.jid);
	};
</script>

<div class="text-center p-2 outline outline-purple-800 h-screen basis-1/2">
	<h1>List of users using the bot:</h1>
	{#each $users as user}
		<User {user} on:remove={(_event) => handleRemove(_event.detail)} on:userSelected on:block />
	{/each}
</div>

<style></style>
