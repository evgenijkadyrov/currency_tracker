import { useContext } from 'react';
import { Link } from 'react-router-dom';

import * as styles from '@/components/NavPanel/styles.module.scss';
import { ThemeContext } from '@/components/Theme';
import { dataNavPanel } from '@/constants/appRoutes';
import { getLinkClass } from '@/utils/getLinkClass.helper';

export const NavBar = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className={styles.containerNavList}>
			{dataNavPanel.map(({ id, dest, title }) => (
				<Link
					key={id}
					to={dest}
					className={getLinkClass(
						styles.containerNavItem,
						styles.containerNavItemLight,
						theme
					)}
				>
					{' '}
					{title}{' '}
				</Link>
			))}
		</div>
	);
};
