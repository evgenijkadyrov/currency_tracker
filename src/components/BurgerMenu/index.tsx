import React, { ReactNode, useEffect } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

interface MenuProps {
	children: ReactNode;
	open: boolean;
	onClose: () => void;
}

export const BurgerMenu = ({ children, open, onClose }: MenuProps) => {
	const { theme } = useTheme();

	function handleKeypress(event: React.KeyboardEvent<HTMLDivElement>) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	useEffect(() => {
		function fn(event: any) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', fn);

		return () => document.removeEventListener('keydown', fn);
	}, [onClose]);

	return (
		<>
			<div
				className={`${styles.overlay} ${open ? styles.open : ''}`}
				onClick={onClose}
				role="presentation"
				onKeyPress={handleKeypress}
			/>

			<div
				className={`${getLinkClass(styles.menuContainer, styles.menuContainerDark, theme)} ${open ? '' : styles.closed}`}
			>
				{children}
			</div>
		</>
	);
};
