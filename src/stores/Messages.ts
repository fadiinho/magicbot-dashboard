import { writable } from 'svelte/store';
import type { IMessage } from '../types';

function createMessagesStore() {
	const { set, subscribe, update } = writable<IMessage[]>([]);

	return {
		subscribe,
		addMessages: (messages: IMessage[]) => update((_messages) => [..._messages, ...messages]),
		removeMessages: (messagesId: string[]) =>
			update((messages) => messages.filter((_msg) => !messagesId.includes(_msg.id))),
		removeAllUserMessages: (userId: string) =>
			update((messages) =>
				messages.filter((_msg) => {
					if (_msg.isGroup) {
						return _msg.participant !== userId;
					}

					return _msg.from !== userId;
				})
			),
		clean: () => set([])
	};
}

export const messages = createMessagesStore();
