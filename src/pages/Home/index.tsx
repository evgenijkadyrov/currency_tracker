import { useEffect, useState } from 'react';

import { fetchCurrencyExchange, ICurrencyData } from '@/api/currency';
import { ExchangeBlock } from '@/components/ExchangeBlock';
import { Modal } from '@/components/Modal';
import { StocksBlock } from '@/components/ui/StocksBlock';
import { dataStocks } from '@/constants/dataAssets';
import { useModalAction } from '@/hooks/useModalAction';
import {
	calculateTimeDifference,
	TIME_FOR_RELOAD,
} from '@/utils/calculateTimeDifference';

const Home = () => {
	const [data, setData] = useState<ICurrencyData | undefined>(() => {
		const cachedData = localStorage.getItem('currencyData');
		return cachedData ? JSON.parse(cachedData) : undefined;
	});

	const [currentSymbol, setCurrentSymbol] = useState('');
	const { isModalActive, handleModalOpen, handleModalClose } = useModalAction();
	const handleSymbol = (value: string | undefined) => {
		if (value) setCurrentSymbol(value);
	};

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
			<div>
				{isModalActive && (
					<Modal title="some modal title" onClose={handleModalClose}>
						<div>
							<ExchangeBlock currentSymbol={currentSymbol} />
						</div>
					</Modal>
				)}
			</div>
			<StocksBlock
				title="Stocks"
				data={dataStocks}
				setModalOpen={() => {}}
				setSymbol={handleSymbol}
				disabled
			/>
			<StocksBlock
				title="Quotes"
				data={data}
				setModalOpen={handleModalOpen}
				setSymbol={handleSymbol}
			/>
		</div>
	);
};

export default Home;
