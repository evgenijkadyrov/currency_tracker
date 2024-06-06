import { Logo } from '@/components/NavPanel/Logo';
import { NavBar } from '@/components/NavPanel/NavBar';
import { Toggle } from '@/components/NavPanel/Toggle';

import * as styles from './styles.module.scss';

export const NavPanel = () => (
	<div className={styles.container}>
		<div className={styles.wrapper}>
			<Logo />
			<NavBar />
			<Toggle />
		</div>
	</div>
);
