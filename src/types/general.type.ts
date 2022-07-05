import type { SvelteComponent } from 'svelte';
import type { IUser } from './user.type';

export interface IActionsProps {
	title: string;
	content: string;
	confirm: string;
	cancel: string;
	component?: SvelteComponent;
}

export interface IAction {
	[key: string]: IActionsProps;
}

export type Events = {
	remove: { user: IUser; full?: boolean };
	userSelected: string;
	block: {
		user: IUser;
		action: 'block' | 'unblock';
	};
};
