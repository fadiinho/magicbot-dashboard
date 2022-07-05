<script lang="ts">
	import Message from './Message.svelte';
	import MediaMessage from './MediaMessage.svelte';

	import { messages } from '../stores';

	export let selectedUserId = '';

	const messagesComponents = [
		{ type: ['imageMessage', 'videoMessage', 'stickerMessage'], component: MediaMessage },
		{ type: ['conversation', 'extendedTextMessage'], component: Message }
	];

	let selected: typeof messagesComponents[0] | undefined = messagesComponents[0];
</script>

{#if selectedUserId}
	<div>
		{#each $messages as message}
			{(selected = messagesComponents.find((c) => c.type.includes(message.type))) && ''}
			{#if message.isGroup && message.participant === selectedUserId && selected}
				<svelte:component
					this={selected.component}
					message={{ ...message, from: message.participant }}
				/>
			{/if}

			{#if !message.isGroup && message.from === selectedUserId && selected}
				<svelte:component this={selected.component} {message} />
			{/if}
		{/each}
	</div>
{/if}

<style></style>
