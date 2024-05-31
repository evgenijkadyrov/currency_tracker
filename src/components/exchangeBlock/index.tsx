import React, { ChangeEvent, useEffect, useState } from 'react';

import { getExchange } from '@/api/currency';
import { DataAssets } from '@/constants/dataAssets';

import * as styles from './styles.module.scss';

interface IExchangeBlock {
	currentSymbol: string;
}

export const ExchangeBlock = ({ currentSymbol }: IExchangeBlock) => {
	const [assetAmount, setAssetAmount] = useState('');
	const [fromAssetSymbol, setFromAssetSymbol] = useState(currentSymbol);
	const [toAssetSymbol, setToAssetSymbol] = useState('USDT');
	const [courseExchange, setCourseExchange] = useState(0);
	const [resultOfExchange, setResultOfExchange] = useState(0);
	const currencySymbols = Object.keys(DataAssets);

	const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
		setAssetAmount(e.target.value);
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getExchange(fromAssetSymbol, toAssetSymbol);
				setCourseExchange(result.rate);
			} catch (e) {
				throw new Error(e);
			}
		};

		fetchData();
	}, [assetAmount, fromAssetSymbol, toAssetSymbol]);

	const handleClickCalculate = () => {
		const result = Number(assetAmount) * courseExchange;
		setResultOfExchange(Number(result.toFixed(4)));
	};
	const handleFromAsset = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		setFromAssetSymbol(selectedValue);
	};
	const handleToAsset = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		setToAssetSymbol(selectedValue);
	};
	return (
		<div>
			<div className={styles.row}>
				<input
					type="number"
					name="fromCurrencyInput"
					value={assetAmount}
					className={styles.input}
					onChange={handleChangeAmount}
				/>
				<button
					className={styles.symbol}
					onClick={handleClickCalculate}
					type="button"
				>
					Calculate
				</button>
			</div>
			<div className={styles.row}>
				<select
					name="currencyOption"
					id="CurrencyOption"
					className={styles.select}
					defaultValue={currentSymbol}
					onChange={handleFromAsset}
				>
					{currencySymbols.map((symbol) => (
						<option key={symbol} value={symbol}>
							{symbol}
						</option>
					))}
				</select>

				<select
					name="currencyOption"
					id="CurrencyOption"
					className={styles.select}
					defaultValue="USDT"
					onChange={handleToAsset}
				>
					{currencySymbols.map((symbol) => (
						<option key={symbol} value={symbol}>
							{symbol}
						</option>
					))}
				</select>
			</div>
			<div> Result {resultOfExchange}</div>
		</div>
	);
};
