import axios from 'axios';

export const configApi = () => ({
	headers: {
		Accept: 'text/plain',
		'X-CoinAPI-Key': process.env.API_KEY,
	},
});
export const instance = axios.create({
	baseURL: 'https://rest.coinapi.io/v1/exchangerate/',
});
