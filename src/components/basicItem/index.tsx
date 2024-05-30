import { useContext } from 'react';

import EuroIcon from '@/assets/icons/Euro Icon.svg';
import { ThemeContext } from '@/components/theme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

export const BasicItem = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div
			className={getLinkClass(styles.container, styles.containerDark, theme)}
		>
			<div className={styles.containerBlock}>
				<div className={styles.containerBlockIcon}>
					<EuroIcon width={80} height={80} />
				</div>
				<div className={styles.containerBlockData}>
					<div
						className={getLinkClass(
							styles.containerBlockDataUpperText,
							styles.containerBlockDataUpperTextDark,
							theme
						)}
					>
						Euro
					</div>
					<div className={styles.containerBlockDataLowerText}> 0.15%</div>
				</div>
			</div>
		</div>
	);
};
