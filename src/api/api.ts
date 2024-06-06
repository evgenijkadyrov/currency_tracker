import axios from 'axios';

export const configApiCurrency = () => ({
	headers: {
		Accept: 'text/plain',
		'X-CoinAPI-Key': 'd03246ef-769c-473e-af19-87a9b649a86e',
	},
});
export const instanceCurrency = axios.create({
	baseURL: 'https://rest.coinapi.io/v1/exchangerate/',
});

export const instanceBanks = axios.create({
	baseURL: 'https://api.opentripmap.com/0.1/en/places/',
});
