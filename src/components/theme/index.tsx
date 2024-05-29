import { createContext, ReactElement, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextProp = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = createContext<ThemeContextProp>(
	{} as ThemeContextProp
);
type Props = {
	children: string | ReactElement | ReactElement[];
};
export const ThemeProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState<Theme>('light');
	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};
	const memoizedValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
	const color = theme === 'light' ? '#333' : '#FFF';
	const backgroundColor = theme === 'light' ? '#FFF' : '#333';

	document.body.style.color = color;
	document.body.style.backgroundColor = backgroundColor;

	return (
		<ThemeContext.Provider value={memoizedValue}>
			{children}
		</ThemeContext.Provider>
	);
};
