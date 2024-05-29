import { createBrowserRouter } from 'react-router-dom';

import { AppRoutes } from '@/constants/appRoutes';
import Home from '@/pages/home';

export const router = createBrowserRouter([
	{
		path: AppRoutes.HOME,
		element: <Home />,
	},
]);
