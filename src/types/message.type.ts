import type { WAMessage, MessageType } from '@adiwajshing/baileys';

export interface IMessage {
	isGroup: boolean;
	messageInfo: WAMessage;
	text: string;
	from: string;
	media?: Buffer;
	command: string;
	participant?: string;
	isCommand: boolean;
	type: MessageType;
	userPicture: Buffer;
	id: string;
}
