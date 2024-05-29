import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

import { Layout } from '@/components/layout';
import { AppRoutes } from '@/constants/appRoutes';
import Home from '@/pages/home';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={AppRoutes.HOME} errorElement="error">
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path={AppRoutes.TIMELINE} element="time" />
				<Route path={AppRoutes.BANK_CARD} element="bank" />
				<Route path={AppRoutes.CONTACTS} element="contact" />
			</Route>
			<Route path={AppRoutes.NOT_FOUND} element="404" />
		</Route>
	)
);
