<script lang="ts">
	import { onMount } from 'svelte';
	import type { IMessage } from '../types';

	export let message: IMessage;

	let blobUrl: string;

	onMount(() => {
		if (!message.media) return;

		const mediaBlob = new Blob([message.media]);
		blobUrl = URL.createObjectURL(mediaBlob);
	});
</script>

<div class="m-2 p-2 sm:max-w-xs md:max-w-lg mx-auto bg-purple-800 text-white rounded">
	<p class="">{message.messageInfo.pushName}</p>
	<p class="text-purple-400 -mt-1 font-medium text-xs">
		{message.from.replace('@s.whatsapp.net', '')}
	</p>
	{#if message.type === 'imageMessage'}
		<img src={blobUrl} alt="media message" />
	{:else}
		<video src={blobUrl} controls>
			<track kind="captions" />
		</video>
	{/if}
</div>

<style></style>
