import { createContext, ReactElement, useMemo, useState } from 'react';

import {
	THEME_BACKGROUND_DARK,
	THEME_BACKGROUND_LIGHT,
	THEME_FONT_DARK,
	THEME_FONT_LIGHT,
} from '@/styles/colors';

export type Theme = 'light' | 'dark';
export type ThemeContextProp = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = createContext<ThemeContextProp>(
	{} as ThemeContextProp
);
type Props = {
	children: string | ReactElement | ReactElement[];
};
export const ThemeProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState<Theme>('dark');
	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};
	const memoizedValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
	const color = theme === 'light' ? THEME_FONT_DARK : THEME_FONT_LIGHT;
	const backgroundColor =
		theme === 'light' ? THEME_BACKGROUND_DARK : THEME_BACKGROUND_LIGHT;

	document.body.style.color = color;
	document.body.style.backgroundColor = backgroundColor;

	return (
		<ThemeContext.Provider value={memoizedValue}>
			{children}
		</ThemeContext.Provider>
	);
};
