import logo from '@/assets/diagram-svgrepo-com 1.png';
import { NavPanel } from '@/components/NavPanel';
import { useTheme } from '@/hooks/useTheme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

const Header = () => {
	const { theme } = useTheme();
	return (
		<header>
			<div>
				<NavPanel />
				<div className={getLinkClass(styles.container, styles.dark, theme)}>
					<div className={styles.containerContent}>
						<h1 className={styles.containerTitle}>Modsen Currency Tracker</h1>
						<p className={styles.containerText}>
							Quotes for the dollar and other international currencies.
						</p>
					</div>
					<div className={styles.containerImageBlock}>
						<img src={logo} alt="logo" className={styles.containerImage} />
					</div>
				</div>
				<div className={styles.updatedRow}>
					<span className={styles.updatedPulseButton} />
					<p className={styles.updatedText!}>Last updated at 11:59pm</p>
				</div>
			</div>
		</header>
	);
};

export default Header;
