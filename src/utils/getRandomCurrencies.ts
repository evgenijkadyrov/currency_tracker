import { currencies } from '@/utils/getCurrenciesList';

export const getRandomCurrencies = () => {
	const randomCurrencies: string[] = [];
	while (randomCurrencies.length < 3) {
		const randomIndex = Math.floor(Math.random() * currencies.length);
		const randomCurrency = currencies[randomIndex];
		if (!randomCurrencies.includes(randomCurrency)) {
			randomCurrencies.push(randomCurrency);
		}
	}
	return randomCurrencies;
};
