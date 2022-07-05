<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	export let confirmTitle = 'Confirm?';
	export let confirmButtonText = 'Confirm';
	export let cancelButtonText = 'Cancel';

	const dispatch = createEventDispatcher<{ confirm: MouseEvent; cancel: MouseEvent }>();
	const handleEvent = (_event: 'confirm' | 'cancel') => {
		dispatch(_event);
	};
</script>

<div
	transition:slide={{ delay: 100, duration: 200, easing: quintOut }}
	class="flex text-center flex-col fixed p-2 bg-purple-900 left-1/2 top-1/2 outline outline-purple-700 rounded"
>
	<span>{confirmTitle}</span>
	<div class="m-4">
		<slot name="content">Are you sure?</slot>
	</div>
	<div class="mx-4 mb-0">
		<slot name="actions">
			<button
				class="mx-2 p-1 px-2 bg-purple-700 hover:bg-purple-800 rounded"
				on:click={() => dispatch('confirm')}>{confirmButtonText}</button
			>
			<button
				class="mx-2 p-1 px-2 bg-purple-700 hover:bg-purple-800 rounded"
				on:click={() => handleEvent('cancel')}>{cancelButtonText}</button
			>
		</slot>
	</div>
</div>
