import { createBrowserRouter } from 'react-router-dom';

import { AppRoutes } from '@/constants/appRoutes';
import { LazyHome } from '@/pages/home/index.lazy';

export const router = createBrowserRouter([
	{
		path: AppRoutes.HOME,
		element: <LazyHome />,
	},
]);
