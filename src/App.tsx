import { RouterProvider } from 'react-router-dom';

import { Layout } from '@/components/layout';
import { router } from '@/router/router';

function App() {
	return (
		<>
			<Layout />
			<RouterProvider router={router} fallbackElement="Loading.." />;
		</>
	);
}
export default App;
