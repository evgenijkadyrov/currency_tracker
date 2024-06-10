import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { useTheme } from '@/hooks/useTheme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

export const Layout = () => {
	const { theme } = useTheme();
	return (
		<div
			className={getLinkClass(styles.container, styles.containerDark, theme)}
		>
			<div className={styles.wrapper}>
				<Header />
				<main>
					<Suspense fallback={<h1>Loading...</h1>}>
						<Outlet />
					</Suspense>
				</main>
				<Footer />
			</div>
		</div>
	);
};
