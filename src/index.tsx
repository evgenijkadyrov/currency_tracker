import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@/components/App';
import { LazyAbout } from '@/pages/about/index.lazy';
import { LazyContact } from '@/pages/contact/index.lazy';

document.body.innerHTML = '<div id="app"></div>';
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/about',
				element: (
					<Suspense fallback={<div>Loading</div>}>
						<LazyAbout />
					</Suspense>
				),
			},
			{
				path: '/contact',
				element: (
					<Suspense fallback={<div>Loading</div>}>
						<LazyContact />
					</Suspense>
				),
			},
		],
	},
]);
// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<RouterProvider router={router} />);
