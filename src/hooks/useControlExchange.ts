import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface ControlExchangeState {
	fromAssetSymbol: string;
	toAssetSymbol: string;
	assetAmount: string;
}

interface ControlExchangeActions {
	handleFromAsset: (value: string) => void;
	handleToAsset: (value: string) => void;
	setAssetAmount: Dispatch<SetStateAction<string>>;
}

export const useControlExchange = (
	currentSymbol: string
): ControlExchangeState & ControlExchangeActions => {
	const [fromAssetSymbol, setFromAssetSymbol] = useState<string>(currentSymbol);
	const [toAssetSymbol, setToAssetSymbol] = useState<string>('USDT');
	const [assetAmount, setAssetAmount] = useState<string>('');

	const handleFromAsset = useCallback((value: string) => {
		setAssetAmount('');
		setFromAssetSymbol(value);
	}, []);

	const handleToAsset = useCallback((value: string) => {
		setAssetAmount('');
		setToAssetSymbol(value);
	}, []);

	return {
		fromAssetSymbol,
		toAssetSymbol,
		assetAmount,
		handleFromAsset,
		handleToAsset,
		setAssetAmount,
	};
};
