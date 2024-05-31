import { useContext, useEffect, useState } from 'react';

import { fetchCurrencyExchange, ICurrencyData } from '@/api/currency';
import { StocksBlock } from '@/components/stocksBlock';
import { ThemeContext } from '@/components/theme';
import { dataStocks } from '@/constants/dataAssets';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

const Home = () => {
	const { theme } = useContext(ThemeContext);
	const [data, setData] = useState<ICurrencyData>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result: ICurrencyData = await fetchCurrencyExchange('USD');
				// const timeseries:IBasicStocks = await fetchTimeseriesData('USD', 'RUB');
				setData(result);
			} catch (e) {
				throw new Error(e);
			}
		};

		fetchData();
	}, []);

	return (
		<div
			className={getLinkClass(styles.container, styles.containerDark, theme)}
		>
			<StocksBlock title="Stocks" data={dataStocks} />
			<StocksBlock title="Quotes" data={data} />
		</div>
	);
};

export default Home;
