import React, { memo, useEffect, useState } from 'react';

import { Modal } from '@/components/modalCustom';

export interface INotification {
	diff: number;
	subscribers: any[];
	subscribe(functionToSubscribe: any): void;
	unsubscribe(functionToUnsubscribe: any): void;
	setDiff(newDiff: number): void;
}

interface IProps {
	notification: INotification;
}

export const NotificationDisplay = memo(({ notification }: IProps) => {
	const [diff, setDiff] = useState(30);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		notification.subscribe(setDiff);

		return () => notification.unsubscribe(setDiff);
	}, [notification]);
	const handleModalClose = () => {
		setIsOpen(false);
	};
	useEffect(() => {
		if (diff > 29) {
			setIsOpen(true);
			const id = setTimeout(() => {
				handleModalClose();
			}, 3000);
			return () => {
				clearTimeout(id);
			};
		}

		return () => {};
	}, [diff]);

	return isOpen ? (
		<Modal
			title="some modal title"
			onClose={handleModalClose}
			size={{ width: '700px', height: '350px' }}
		>
			<div style={{ color: 'white' }}>Chart is ready</div>
		</Modal>
	) : null;
});
