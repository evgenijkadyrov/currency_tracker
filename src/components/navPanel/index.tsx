import { Logo } from '@/components/navPanel/logo';
import { NavBar } from '@/components/navPanel/navBar';
import { ToggleTheme } from '@/components/navPanel/toggleTheme';

import * as styles from './styles.module.scss';

export const NavPanel = () => (
	<div className={styles.container}>
		<div className={styles.wrapper}>
			<Logo />
			<NavBar />
			<ToggleTheme />
		</div>
	</div>
);
