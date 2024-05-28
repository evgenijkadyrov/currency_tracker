import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/header';

import * as styles from './styles.module.scss';

export function Layout() {
	return (
		<div>
			<div className={styles.wrapper}>
				<Header />
				<main>
					<Suspense fallback={<h1>Loading...</h1>}>
						<Outlet />
					</Suspense>
				</main>
				{/* <Footer /> */}
			</div>
		</div>
	);
}
