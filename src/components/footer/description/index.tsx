import { useContext } from 'react';

import { Logo } from '@/components/navPanel/logo';
import { ThemeContext } from '@/components/theme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

export const Description = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className={styles.wrapper}>
			<Logo />
			<div className={styles.description}>
				<div className={styles.descriptionTitle}>Modsen Currency Tracker</div>
				<div
					className={getLinkClass(
						styles.descriptionText,
						styles.descriptionTextLight,
						theme
					)}
				>
					Since then, the company has grown organically to. Starsup is the
					worlds largest trading platform, with $12 billion worth of currency
					trading and 500,000 tickets sold daily to tens of thousands of traders
					worldwide
				</div>
			</div>
		</div>
	);
};
