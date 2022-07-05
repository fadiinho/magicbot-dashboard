<script lang="ts">
	import Messages from './Messages.svelte';

	export let selectedUserId = '';
</script>

<div class="basis-full">
	<Messages bind:selectedUserId />
</div>

<style></style>
