import { ReactNode, useContext } from 'react';

import { ThemeContext } from '@/components/theme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

interface IBasicItem {
	icon: ReactNode;
	name: string;
	value: number;
}

export const BasicItem = ({ icon, name, value }: IBasicItem) => {
	const { theme } = useContext(ThemeContext);
	return (
		<div
			className={getLinkClass(styles.container, styles.containerDark, theme)}
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
					<div className={styles.containerBlockDataLowerText}>
						R$ {value.toFixed(4)}
					</div>
				</div>
			</div>
		</div>
	);
};
