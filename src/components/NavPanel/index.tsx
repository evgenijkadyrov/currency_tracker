import { Logo } from '@/components/NavPanel/Logo';
import { NavBar } from '@/components/NavPanel/NavBar';
import * as styles from '@/components/NavPanel/styles.module.scss';
import { ToggleTheme } from '@/components/NavPanel/ToggleTheme';

export const NavPanel = () => (
	<div className={styles.container}>
		<div className={styles.wrapper}>
			<Logo />
			<NavBar />
			<ToggleTheme />
		</div>
	</div>
);
