import { useContext } from 'react';

import * as styles from '@/components/Footer/Description/styles.module.scss';
import { Logo } from '@/components/NavPanel/Logo';
import { ThemeContext } from '@/components/Theme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

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
