import axios from 'axios';

import { API_COINAPI } from '@/constants/api';

export const configApiCurrency = () => ({
	headers: {
		Accept: 'text/plain',
		'X-CoinAPI-Key': API_COINAPI,
	},
});
export const instanceCurrency = axios.create({
	baseURL: 'https://rest.coinapi.io/v1/exchangerate/',
});

export const instanceBanks = axios.create({
	baseURL: 'https://api.opentripmap.com/0.1/en/places/',
});
