import { useContext } from 'react';

import * as styles from '@/components/navPanel/styles.module.scss';
import { ThemeContext } from '@/components/theme';

export const ToggleTheme = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	return (
		<div className={styles.containerSelectorTheme}>
			<button type="button" onClick={toggleTheme}>
				Switch to {theme === 'light' ? 'dark' : 'light'} mode
			</button>
		</div>
	);
};
