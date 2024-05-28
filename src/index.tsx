import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { App } from '@/components/App';
import { LazyAbout } from '@/pages/about/index.lazy';
import { LazyContact } from '@/pages/contact/index.lazy';

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
ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />)

