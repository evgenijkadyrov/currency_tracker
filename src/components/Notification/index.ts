export interface Observer {
	update: () => void;
}
export class SubjectClass {
	private observers: Observer[] = [];

	attach(observer: Observer) {
		this.observers.push(observer);
	}

	detach(observer: Observer) {
		const index = this.observers.indexOf(observer);
		if (index !== -1) {
			this.observers.splice(index, 1);
		}
	}

	notifyObservers() {
		this.observers.forEach((observer) => {
			observer.update();
		});
	}
}
