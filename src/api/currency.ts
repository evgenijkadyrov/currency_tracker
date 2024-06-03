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
export interface IReturnCurrencyHistory {
	date: number | undefined;
	open: number;
	high: number;
	low: number;
	close: number;
	interval: [number, number];
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
	const { data } = await instance.get<IHistoricalDate[]>(
		`/${assetIdBase}/${assetIdQuote}/history`,
		{
			params: {
				period_id: '1DAY',
				limit: 100,
				time_start: time_period_start,
				time_end: time_period_end,
			},
			...configApi(),
		}
	);
	// const formattedData = data.map((item) => ({
	// 	date: new Date(item.time_period_start.slice(0, 10)).setHours(0, 0, 0, 0),
	// 	open: item.rate_open,
	// 	high: item.rate_high,
	// 	low: item.rate_low,
	// 	close: item.rate_close,
	// 	interval: [item.rate_open, item.rate_close] as [number, number],
	// }));

	return data;
};
