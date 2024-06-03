import { INotification } from '@/components/NotificationDisplay';

export class Notification implements INotification {
	diff = 30;

	subscribers: any = [];

	subscribe = (functionToSubscribe: any): void => {
		this.subscribers.push(functionToSubscribe);

		functionToSubscribe(this.diff);
	};

	unsubscribe = (functionToUnsubscribe: any): void => {
		this.subscribers = this.subscribers.filter(
			(func: any) => func !== functionToUnsubscribe
		);
	};

	setDiff = (newDiff: number): void => {
		this.diff = newDiff;

		this.subscribers.forEach((subscriber: any) => subscriber(this.diff));
	};
}
