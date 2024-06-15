import { configApiCurrency, instanceCurrency } from '@/api/api';
import { DataAssets } from '@/constants/dataAssets';
import { getAssetsList } from '@/utils/getCurrenciesList';

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
	const currency = await instanceCurrency.get<ICurrencyData>(
		`/${assetIdQuote}`,
		{
			params: { filter_asset_id: getAssetsList(DataAssets), invert: true },
			...configApiCurrency(),
		}
	);
	return currency.data;
};
export const getExchange = async (
	assetIdBase: string,
	assetIdQuote: string
) => {
	const exchange = await instanceCurrency.get<IExchange>(
		`/${assetIdBase}/${assetIdQuote}`,
		configApiCurrency()
	);
	return exchange.data;
};
export const fetchHistoricalData = async (
	assetIdQuote: string,
	assetIdBase: string,
	time_period_start: string | null,
	time_period_end: string | null,
	limit: number
) => {
	const { data } = await instanceCurrency.get<IHistoricalDate[]>(
		`/${assetIdBase}/${assetIdQuote}/history`,
		{
			params: {
				period_id: '1DAY',
				limit,
				time_start: time_period_start,
				time_end: time_period_end,
			},
			...configApiCurrency(),
		}
	);

	return data;
};
