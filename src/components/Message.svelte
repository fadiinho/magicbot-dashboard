<script lang="ts">
	import type { IMessage } from '../types/message.type';

	export let message: IMessage;
</script>

<div class="m-2 p-2 sm:max-w-xs md:max-w-lg mx-auto bg-purple-800 text-white rounded">
	<p class="">{message.messageInfo.pushName}</p>
	<p class="text-purple-400 -mt-1 font-medium text-xs">
		{message.from.replace('@s.whatsapp.net', '')}
	</p>
	<p class="text-base">{message.text}</p>
</div>

<style>
</style>
