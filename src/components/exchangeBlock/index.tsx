import React, {
	ChangeEvent,
	memo,
	useCallback,
	useEffect,
	useState,
} from 'react';

import { getExchange } from '@/api/currency';
import { Input } from '@/components/Input';
import { SelectAsset } from '@/components/SelectAssets';
import { DataAssets } from '@/constants/dataAssets';
import { useControlExchange } from '@/hooks/useControlExchange';

import * as styles from './styles.module.scss';

interface IExchangeBlock {
	currentSymbol: string;
}

export const ExchangeBlock = memo(({ currentSymbol }: IExchangeBlock) => {
	const [courseExchange, setCourseExchange] = useState(0);
	const [resultOfExchange, setResultOfExchange] = useState(0);
	const currencySymbols = Object.keys(DataAssets);
	const {
		assetAmount,
		fromAssetSymbol,
		toAssetSymbol,
		handleFromAsset,
		handleToAsset,
		setAssetAmount,
	} = useControlExchange(currentSymbol);

	const handleChangeAmount = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setAssetAmount(e.target.value);
		},
		[setAssetAmount]
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getExchange(fromAssetSymbol, toAssetSymbol);
				setCourseExchange(result.rate);
				const countResult = Number(assetAmount) * courseExchange;
				setResultOfExchange(Number(countResult.toFixed(4)));
			} catch (e) {
				throw new Error(e);
			}
		};
		fetchData();
	}, [assetAmount, fromAssetSymbol, toAssetSymbol]);

	return (
		<div>
			<h4 className={styles.title}>Exchange assets</h4>
			<div className={styles.row}>
				<Input
					type="number"
					name="fromCurrencyInput"
					value={assetAmount}
					className={styles.input}
					onChange={handleChangeAmount}
					placeholder="Enter amount of asset"
				/>
			</div>
			<div className={styles.row}>
				<SelectAsset
					name="fromCurrencyOption"
					id="FromCurrencyOption"
					className={styles.select}
					defaultValue={currentSymbol}
					options={currencySymbols}
					onChange={handleFromAsset}
				/>
				<SelectAsset
					name="toCurrencyOption"
					id="ToCurrencyOption"
					className={styles.select}
					defaultValue="USDT"
					options={currencySymbols}
					onChange={handleToAsset}
				/>
			</div>
			<h4 className={styles.title}>Result of exchange asset: </h4>
			<Input
				type="number"
				name="resultExchange"
				value={resultOfExchange}
				className={styles.input}
				placeholder="'Result of exchange'"
			/>
		</div>
	);
});
