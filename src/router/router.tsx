import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

import { Layout } from '@/components/ui/Layout';
import { AppRoutes } from '@/constants/appRoutes';
import { LazyBank } from '@/pages/BankCard/index.lazy';
import { LazyContact } from '@/pages/Contact/index.lazy';
import { LazyHome } from '@/pages/Home/index.lazy';
import { LazyTimeLine } from '@/pages/TimeLine/index.lazy';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={AppRoutes.HOME} errorElement="error">
			<Route element={<Layout />}>
				<Route index element={<LazyHome />} />
				<Route path={AppRoutes.TIMELINE} element={<LazyTimeLine />} />
				<Route path={AppRoutes.BANK_CARD} element={<LazyBank />} />
				<Route path={AppRoutes.CONTACTS} element={<LazyContact />} />
			</Route>
			<Route path={AppRoutes.NOT_FOUND} element="404" />
		</Route>
	)
);
