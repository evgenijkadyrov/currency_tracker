import { useEffect, useState } from 'react';

import { fetchCurrencyExchange, ICurrencyData } from '@/api/currency';
import { StocksBlock } from '@/components/ui/StocksBlock';
import { dataStocks } from '@/constants/dataAssets';
import {
	calculateTimeDifference,
	TIME_FOR_RELOAD,
} from '@/utils/calculateTimeDifference';

const getCacheData = () => {
	const cachedData = localStorage.getItem('currencyData');
	return cachedData ? JSON.parse(cachedData) : undefined;
};

const Home = () => {
	const [data, setData] = useState<ICurrencyData | undefined>(getCacheData());

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchCurrencyExchange('USD');
				setData(result);
				localStorage.setItem('currencyData', JSON.stringify(result));
			} catch (e) {
				throw new Error(String(e));
			}
		};

		if (!data || calculateTimeDifference() > TIME_FOR_RELOAD) {
			fetchData();
		}
	}, []);

	return (
		<div>
			<StocksBlock title="Stocks" data={dataStocks} disabled />
			<StocksBlock title="Quotes" data={data} />
		</div>
	);
};

export default Home;
