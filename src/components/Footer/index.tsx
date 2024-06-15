import { Description } from '@/components/Footer/Description';

import { Menu } from './Menu';

import * as styles from './styles.module.scss';

export const Footer = () => (
	<footer>
		<div className={styles.footerContainer}>
			<div className={styles.footerWrapper}>
				<div className={styles.columnWrapper}>
					<div className={styles.column}>
						<Description />
					</div>
					<div className={styles.column}>
						<Menu />
					</div>
				</div>
				<div className={styles.rights}>
					Startsup © 2023-2024, All Rights Reserved
				</div>
			</div>
		</div>
	</footer>
);
