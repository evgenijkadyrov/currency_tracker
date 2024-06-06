import { useContext } from 'react';

import * as styles from '@/components/NavPanel/styles.module.scss';
import { ThemeContext } from '@/components/Theme';

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
