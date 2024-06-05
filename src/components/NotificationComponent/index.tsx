import React, { useEffect, useState } from 'react';

import { Observer } from '@/components/Notification';

interface IProps {
	onDataLoaded: () => { limit: number; dataReceived: boolean };
}

export const NotificationComponent: React.FC<IProps> = ({ onDataLoaded }) => {
	const [, setObservers] = useState<Observer[]>([]);
	const [isShow, setIsShowMessage] = useState(false);
	const detachAllObservers = () => {
		setObservers([]);
	};
	useEffect(
		() => () => {
			detachAllObservers();
		},
		[]
	);

	useEffect(() => {
		if (onDataLoaded().limit === 30 && onDataLoaded().dataReceived) {
			setIsShowMessage(true);
		}
	}, [onDataLoaded]);

	return <> {isShow && <div>Loaded</div>}</>;
};
