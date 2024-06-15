import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { getExchange } from '@/api/currency';
import { DataAssets } from '@/constants/dataAssets';

interface ControlExchangeState {
	assetAmount: string;
	currencySymbols: any;
	resultOfExchange: number;
}

interface ControlExchangeActions {
	handleFromAsset: (value: string) => void;
	handleToAsset: (value: string) => void;
	handleChangeAmount: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useControlExchange = (
	currentSymbol: string
): ControlExchangeState & ControlExchangeActions => {
	const [fromAssetSymbol, setFromAssetSymbol] = useState<string>(currentSymbol);
	const [toAssetSymbol, setToAssetSymbol] = useState<string>('USDT');
	const [assetAmount, setAssetAmount] = useState<string>('');
	const [courseExchange, setCourseExchange] = useState(0);
	const [resultOfExchange, setResultOfExchange] = useState(0);

	const currencySymbols = Object.keys(DataAssets);

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
				throw new Error(String(e));
			}
		};
		fetchData();
	}, [assetAmount, fromAssetSymbol, toAssetSymbol]);
	const handleFromAsset = useCallback((value: string) => {
		setAssetAmount('');
		setFromAssetSymbol(value);
	}, []);

	const handleToAsset = useCallback((value: string) => {
		setAssetAmount('');
		setToAssetSymbol(value);
	}, []);

	return {
		assetAmount,
		handleFromAsset,
		handleToAsset,
		resultOfExchange,
		currencySymbols,
		handleChangeAmount,
	};
};
