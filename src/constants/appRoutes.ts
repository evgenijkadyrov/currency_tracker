export enum AppRoutes {
	HOME = '/',
	TIMELINE = '/timeline',
	BANK_CARD = '/bank_card',
	CONTACTS = '/contacts',
	NOT_FOUND = '*',
}

export const dataNavPanel = [
	{ id: 1, title: 'Home', dest: AppRoutes.HOME },
	{ id: 2, title: 'Timeline', dest: AppRoutes.TIMELINE },
	{ id: 3, title: 'Bank Card', dest: AppRoutes.BANK_CARD },
	{ id: 4, title: 'Contacts', dest: AppRoutes.CONTACTS },
];
