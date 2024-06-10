import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

import { Layout } from '@/components/ui/Layout';
import { AppRoutes } from '@/constants/appRoutes';
import { BankCard } from '@/pages/BankCard';
import Contacts from '@/pages/Contact';
import Home from '@/pages/Home';
import TimeLineClass from '@/pages/TimeLine/indexClass';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={AppRoutes.HOME} errorElement="error">
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path={AppRoutes.TIMELINE} element={<TimeLineClass />} />
				<Route path={AppRoutes.BANK_CARD} element={<BankCard />} />
				<Route path={AppRoutes.CONTACTS} element={<Contacts />} />
			</Route>
			<Route path={AppRoutes.NOT_FOUND} element="404" />
		</Route>
	)
);
