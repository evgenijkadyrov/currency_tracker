import { useContext } from 'react';

import { ThemeContext } from '@/components/Theme';
import { MENU_DATA } from '@/constants/dataMenu';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

export const Menu = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className={styles.menuWrapper}>
			<div className={styles.menuContainer}>
				{MENU_DATA.map((section) => (
					<div className={styles.menuSection} key={section.title}>
						<div
							className={getLinkClass(
								styles.menuTitle,
								styles.menuTitleLight,
								theme
							)}
						>
							{section.title}
						</div>
						{section.items.map((item) => (
							<div
								className={getLinkClass(
									styles.menuItem,
									styles.menuItemLight,
									theme
								)}
								key={item}
							>
								{item}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};
