import { useContext } from 'react';

import { ThemeContext } from '@/components/Theme';

export const useTheme = () => {
	const { theme } = useContext(ThemeContext);
	return { theme };
};
