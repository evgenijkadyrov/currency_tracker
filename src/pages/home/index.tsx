import { useContext } from 'react';

import { StocksBlock } from '@/components/stocksBlock';
import { ThemeContext } from '@/components/theme';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

const Home = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div
			className={getLinkClass(styles.container, styles.containerDark, theme)}
		>
			<StocksBlock title="Stocks" />
			<StocksBlock title="Quotes" />
		</div>
	);
};

export default Home;
