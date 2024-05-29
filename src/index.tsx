import ReactDOM from 'react-dom/client';

import App from '@/App';
import { ThemeProvider } from '@/components/theme';

import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<App />
	</ThemeProvider>
);
