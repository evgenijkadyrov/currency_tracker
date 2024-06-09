import { RouterProvider } from 'react-router-dom';

import { router } from '@/router/router';

const App = () => (
	<RouterProvider router={router} fallbackElement="Loading.." />
);

export default App;
