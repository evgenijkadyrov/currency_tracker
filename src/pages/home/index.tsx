import { useContext, useEffect, useState } from 'react';

import { fetchCurrencyExchange, ICurrencyData } from '@/api/currency';
import { ExchangeBlock } from '@/components/exchangeBlock';
import { Modal } from '@/components/modalCustom';
import { StocksBlock } from '@/components/stocksBlock';
import { ThemeContext } from '@/components/theme';
import { dataStocks } from '@/constants/dataAssets';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

const Home = () => {
	const { theme } = useContext(ThemeContext);
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
				const result: ICurrencyData = await fetchCurrencyExchange('USD');
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
