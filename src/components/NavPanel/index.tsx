import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CloseIcon } from '@/assets/icons/CloseIcon';
import { BurgerMenu } from '@/components/BurgerMenu';
import { Logo } from '@/components/NavPanel/Logo';
import { NavBar } from '@/components/NavPanel/NavBar';
import { Toggle } from '@/components/NavPanel/Toggle';
import { dataNavPanel } from '@/constants/appRoutes';
import { useTheme } from '@/hooks/useTheme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

export const NavPanel = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { theme } = useTheme();

	const onClose = () => {
		setIsOpen(false);
	};
	const handleOpenBurger = () => {
		setIsOpen(true);
	};
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Logo />
				<div
					role="presentation"
					onClick={handleOpenBurger}
					className={styles.menu}
				>
					Menu
				</div>
				<BurgerMenu open={isOpen} onClose={onClose}>
					<div
						role="presentation"
						className={styles.closeBurger}
						onClick={onClose}
					>
						<CloseIcon height={36} width={36} />
					</div>
					{dataNavPanel.map(({ title, id, dest }) => (
						<Link
							key={id}
							to={dest}
							className={getLinkClass(styles.link, styles.linkDark, theme)}
							onClick={onClose}
						>
							{title}
						</Link>
					))}
				</BurgerMenu>
				<NavBar />
				<Toggle />
			</div>
		</div>
	);
};
