import { KeyboardEvent, memo, ReactNode, useContext } from 'react';

import { ThemeContext } from '@/components/Theme';
import { getLinkClass } from '@/utils/getLinkClass.helper';
import { getSymbolByTitle } from '@/utils/getSymbolByTitle.helper';

import * as styles from './styles.module.scss';

interface IBasicItem {
	icon: ReactNode;
	name: string;
	value?: number;
	setModalOpen?: (value: boolean) => void;
	setSymbol?: (value: string) => void;
}

export const BasicItem = memo(
	({ icon, name, value, setModalOpen, setSymbol }: IBasicItem) => {
		const { theme } = useContext(ThemeContext);
		const handleClick = () => {
			setModalOpen(true);
			setSymbol(getSymbolByTitle(name));
		};
		const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Enter') {
				handleClick();
			}
		};
		return (
			<div
				className={getLinkClass(styles.container, styles.containerDark, theme)}
				onClick={handleClick}
				onKeyDown={handleKeyPress}
				role="button"
				tabIndex={0}
			>
				<div className={styles.containerBlock}>
					<div className={styles.containerBlockIcon}>{icon}</div>
					<div className={styles.containerBlockData}>
						<div
							className={getLinkClass(
								styles.containerBlockDataUpperText,
								styles.containerBlockDataUpperTextDark,
								theme
							)}
						>
							{name}
						</div>
						{value && (
							<div className={styles.containerBlockDataLowerText}>
								R$ {value?.toFixed(4)}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
);
