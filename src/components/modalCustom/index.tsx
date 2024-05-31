import type { MouseEventHandler } from 'react';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import Portal, { createContainer } from './portal';

import * as styles from './styles.module.scss';

const MODAL_CONTAINER_ID = 'exchangeBlock-container-id';

type Props = {
	title: string;
	onClose: () => void;
	children: ReactNode | ReactNode[];
};

export const Modal = ({ children, title, onClose }: Props) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		createContainer({ id: MODAL_CONTAINER_ID });
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleWrapperClick = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && rootRef.current === target) {
				onClose?.();
			}
		};
		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('click', handleWrapperClick);
		window.addEventListener('keydown', handleEscapePress);

		return () => {
			window.removeEventListener('click', handleWrapperClick);
			window.removeEventListener('keydown', handleEscapePress);
		};
	}, [onClose]);

	const handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> =
		useCallback(() => {
			onClose?.();
		}, [onClose]);

	return isMounted ? (
		<Portal id={MODAL_CONTAINER_ID}>
			<div className={styles.wrap} ref={rootRef} data-testid="wrap">
				<div className={styles.content}>
					<button
						type="button"
						className={styles.closeButton}
						onClick={handleClose}
						data-testid="modal-close-button"
					>
						Х
					</button>
					<p className={styles.title}>{title}</p>
					{children}
				</div>
			</div>
		</Portal>
	) : null;
};
