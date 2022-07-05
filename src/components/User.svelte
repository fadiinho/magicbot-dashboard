<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Tooltip } from 'flowbite-svelte';
	import type { IUser, IAction, IActionsProps, Events } from '../types';
	import { UserCircle, Trash, Ban } from 'svelte-heros';
	export let user: IUser;
	import Confirm from './Confirm.svelte';
	import type { SvelteComponent } from 'svelte';

	const makeBlob = (buff: Buffer) => {
		const blob = new Blob([buff]);

		return URL.createObjectURL(blob);
	};

	const dispatch = createEventDispatcher<Events>();
	const eventsToEmit: { event: keyof Events; props: any }[] = [];

	const actionsTexts: IAction[] = [
		{
			remove: {
				title: 'Remove chat',
				content: 'Delete all messages?',
				confirm: 'Yes',
				cancel: 'No'
			}
		},
		{
			block: {
				title: 'Block user?',
				content: 'Wanna block and delete all messages of this chat?',
				confirm: 'Yes',
				cancel: 'No'
			}
		}
	];

	let selectedAction: { props: IActionsProps; component?: SvelteComponent } | undefined;

	function execActions(...events: { event: keyof Events; props: any; confirm?: boolean }[]) {
		for (const event of events) {
			const action = actionsTexts.find((_a) => Object.keys(_a)[0] === event.event);
			if (event.confirm && action) {
				selectedAction = { props: { ...action[event.event] } };
			}

			eventsToEmit.push(event);
		}
	}

	function emitEvents() {
		eventsToEmit.forEach((_e) => {
			dispatch(_e.event, _e.props);
		});
	}
</script>

{#if selectedAction}
	<Confirm
		confirmTitle={selectedAction.props.title}
		confirmButtonText={selectedAction.props.confirm}
		cancelButtonText={selectedAction.props.cancel}
		on:cancel={() => {
			selectedAction = undefined;
		}}
		on:confirm={() => {
			selectedAction = undefined;
			emitEvents();
		}}
	>
		<svelte:fragment slot="content">
			{#if selectedAction.component}
				<svelte:component this={selectedAction.component} />
			{/if}

			{#if selectedAction.props.content}
				<div>{selectedAction.props.content}</div>
			{/if}
		</svelte:fragment>
	</Confirm>
{/if}

<div
	on:click={() => dispatch('userSelected', user.jid)}
	class="cursor-pointer flex relative rounded bg-purple-800 hover:bg-purple-900 p-1 my-1"
	transition:slide={{ delay: 300, duration: 300, easing: quintOut }}
>
	<div class="w-12">
		{#if user.profilePicture}
			<img
				class="rounded-full outline outline-1 outline-purple-400"
				src={makeBlob(user.profilePicture)}
				width="48px"
				height="48px"
				alt="User profile"
			/>
		{:else}
			<UserCircle size="48px" />
		{/if}
	</div>
	<div class="ml-4">
		<div class="mb-1">
			{user.pushName}
		</div>
		<div class="flex">
			<Tooltip content="Delete chat" class="z-50" placement="bottom" trigger="hover">
				<Trash
					class="cursor-pointer h-4 w-4 hover:text-gray-400"
					on:click={() =>
						execActions(
							{ event: 'remove', props: user, confirm: true },
							{ event: 'userSelected', props: '' }
						)}
				/>
			</Tooltip>

			<Tooltip content="Block user" class="z-50" placement="bottom" trigger="hover">
				<Ban
					size="1rem"
					class="cursor-pointer h-4 w-4 hover:text-gray-400"
					on:click={() =>
						execActions(
							{ event: 'block', props: { user, action: 'block' }, confirm: true },
							{ event: 'remove', props: user },
							{ event: 'userSelected', props: '' }
						)}
				/>
			</Tooltip>
		</div>
	</div>
</div>
