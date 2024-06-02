import { configApi, instance } from '@/api/api';
import { DataAssets, getAssetsList } from '@/constants/dataAssets';

type CurrencyExchange = {
	time: string;
	asset_id_quote: string;
	rate: number;
};
export interface ICurrencyData {
	asset_id_base: string;
	rates: CurrencyExchange[];
}

export interface IExchange {
	time: string;
	asset_id_base: string;
	asset_id_quote: string;
	rate: number;
}
export interface IHistoricalDate {
	time_period_start: string;
	time_period_end: string;
	time_open: string;
	time_close: string;
	rate_open: number;
	rate_high: number;
	rate_low: number;
	rate_close: number;
}
export const fetchCurrencyExchange = async (assetIdQuote: string) => {
	const currency = await instance.get<ICurrencyData>(`/${assetIdQuote}`, {
		params: { filter_asset_id: getAssetsList(DataAssets), invert: true },
		...configApi(),
	});
	return currency.data;
};
export const getExchange = async (
	assetIdBase: string,
	assetIdQuote: string
) => {
	const exchange = await instance.get<IExchange>(
		`/${assetIdBase}/${assetIdQuote}`,
		configApi()
	);
	return exchange.data;
};
export const fetchHistoricalData = async (
	assetIdQuote: string,
	assetIdBase: string,
	time_period_start: string,
	time_period_end: string
) => {
	const historicalData = await instance.get<IHistoricalDate[]>(
		`/${assetIdBase}/${assetIdQuote}/history`,
		{
			params: {
				period_id: '1DAY',
				limit: 10,
				time_start: time_period_start,
				time_end: time_period_end,
			},
			...configApi(),
		}
	);
	return historicalData.data;
};
