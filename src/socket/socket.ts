import io from 'socket.io-client';
import { messages, users } from '../stores';

import type { IMessage } from '../types';

const socket = io('ws://localhost:3001');

export function initSocket() {
	socket.on('message', (m: IMessage) => {
		messages.addMessages([m]);

		users.addUser({
			jid: m.isGroup ? m.participant! : m.from,
			profilePicture: m.userPicture,
			pushName: m.messageInfo.pushName ? m.messageInfo.pushName : ''
		});
	});
}

export default socket;
