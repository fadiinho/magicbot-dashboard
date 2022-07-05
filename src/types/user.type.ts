import type { IMessage } from './';

export interface IUser {
	jid: string;
	profilePicture?: Buffer;
	lastMessage?: IMessage;
	pushName: string;
}
