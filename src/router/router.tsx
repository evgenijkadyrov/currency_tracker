import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

import { Layout } from '@/components/layout';
import { AppRoutes } from '@/constants/appRoutes';
import { BankCard } from '@/pages/bankCard';
import Home from '@/pages/home';
import TimeLineClass from '@/pages/timeLine/indexClass';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={AppRoutes.HOME} errorElement="error">
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				{/* <Route path={AppRoutes.TIMELINE} element={<TimeLine />} /> */}
				<Route path={AppRoutes.TIMELINE} element={<TimeLineClass />} />
				<Route path={AppRoutes.BANK_CARD} element={<BankCard />} />
				<Route path={AppRoutes.CONTACTS} element="contact" />
			</Route>
			<Route path={AppRoutes.NOT_FOUND} element="404" />
		</Route>
	)
);
