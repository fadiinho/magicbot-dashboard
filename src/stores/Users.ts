import { writable } from 'svelte/store';
import type { IUser } from '../types';

function createUsersStore() {
	const { subscribe, set, update } = writable<IUser[]>([]);

	return {
		subscribe,
		addUser: (user: IUser) => {
			// update(_users => _users.find((_user) => user.jid === _user.jid) ? [..._users] : [..._users, user])
			update((_users) => [..._users, user]);
		},
		removeUser: (user: IUser) => {
			update((_users) => _users.filter((u) => u.jid !== user.jid));
		},
		clean: set([])
	};
}

export const users = createUsersStore();
