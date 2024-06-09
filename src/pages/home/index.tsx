import { useEffect, useState } from 'react';

import { ICurrencyData } from '@/api/currency';
import { ExchangeBlock } from '@/components/ExchangeBlock';
import { Modal } from '@/components/Modal';
import { StocksBlock } from '@/components/ui/StocksBlock';
import { dataExchange } from '@/constants/_daforChart';
import { dataStocks } from '@/constants/dataAssets';

const Home = () => {
	const [data, setData] = useState<ICurrencyData>();
	const [isModalActive, setModalActive] = useState(false);
	const [currentSymbol, setCurrentSymbol] = useState('');
	const handleModalOpen = () => {
		setModalActive(true);
	};
	const handleModalClose = () => {
		setModalActive(false);
	};
	const handleSymbol = (value: string) => {
		setCurrentSymbol(value);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const result = await fetchCurrencyExchange('USD');
				setData(dataExchange);
			} catch (e) {
				throw new Error(e);
			}
		};

		fetchData();
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
				setModalOpen={handleModalOpen}
				setSymbol={handleSymbol}
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
