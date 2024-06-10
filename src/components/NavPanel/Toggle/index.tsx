import { useContext } from 'react';

import { ThemeContext } from '@/components/Theme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

export const Toggle = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	return (
		<div className={getLinkClass(styles.radios, styles.radiosDark, theme)}>
			<input
				type="radio"
				className={styles.input}
				name="theme"
				onClick={toggleTheme}
				value={theme}
			/>
		</div>
	);
};
