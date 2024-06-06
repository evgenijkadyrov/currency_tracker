import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import * as styles from '@/components/NavPanel/styles.module.scss';
import { ThemeContext } from '@/components/Theme';
import { dataNavPanel } from '@/constants/appRoutes';

export const NavBar = () => {
	const { theme } = useContext(ThemeContext);
	const linkClass = classNames({
		[styles.containerNavItem]: true,
		[styles.containerNavItemLight]: theme === 'light',
	});
	return (
		<div className={styles.containerNavList}>
			{dataNavPanel.map((el) => (
				<Link key={el.id} to={el.dest} className={linkClass}>
					{' '}
					{el.title}{' '}
				</Link>
			))}
		</div>
	);
};
