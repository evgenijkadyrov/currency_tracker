import { KeyboardEvent, memo, ReactNode, useContext } from 'react';
import classNames from 'classnames';

import { ThemeContext } from '@/components/Theme';
import { getLinkClass } from '@/utils/getLinkClass.helper';
import { getSymbolByTitle } from '@/utils/getSymbolByTitle.helper';

import * as styles from './styles.module.scss';

interface IBasicItem {
	icon: ReactNode;
	name: string;
	value?: number;
	setModalOpen?: (value: boolean) => void;
	setSymbol?: (value: string | undefined) => void;
	disabled?: boolean;
}

export const BasicItem = memo(
	({ icon, name, value, setModalOpen, setSymbol, disabled }: IBasicItem) => {
		const { theme } = useContext(ThemeContext);
		const handleClick = () => {
			if (!disabled ?? true) {
				if (setModalOpen) {
					setModalOpen(true);
				}
			}
			if (setSymbol) {
				setSymbol(getSymbolByTitle(name));
			}
		};
		const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Enter' && !disabled) {
				handleClick();
			}
		};
		return (
			<div
				// className={getLinkClass(styles.container, styles.containerDark, theme)}
				className={classNames({
					[styles.container]: true,
					[styles.containerDark]: theme === 'light',
					[styles.disabled]: !!disabled,
				})}
				onClick={handleClick}
				onKeyDown={handleKeyPress}
				role="button"
				tabIndex={0}
			>
				<div className={styles.containerBlock}>
					<div className={styles.containerBlockIcon}>{icon}</div>
					<div className={styles.containerBlockData}>
						<div
							data-testid="open-modal-button"
							className={getLinkClass(
								styles.containerBlockDataUpperText,
								styles.containerBlockDataUpperTextDark,
								theme
							)}
						>
							{name}
						</div>
						{value && (
							<div
								className={getLinkClass(
									styles.containerBlockDataLowerText,
									styles.containerBlockDataLowerTextDark,
									theme
								)}
							>
								R$ {value?.toFixed(4)}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
);
