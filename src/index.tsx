import ReactDOM from 'react-dom/client';

import App from '@/App';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/components/Theme';

import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</ThemeProvider>
);
