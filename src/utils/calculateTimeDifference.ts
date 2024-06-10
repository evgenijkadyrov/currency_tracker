export const TIME_FOR_RELOAD = 60000;

export const calculateTimeDifference = () => {
	const currentTime = Date.now();
	const cachedData = JSON.parse(localStorage.getItem('currencyData'));
	const lastFetchDate = Date.parse(cachedData.rates[0].time);
	return currentTime - lastFetchDate;
};

export const lastTimeCurrencyLoad = () => {
	const cachedData = JSON.parse(localStorage.getItem('currencyData'));
	const lastFetchDate = Date.parse(cachedData?.rates[0].time) || Date.now();
	const dateObj = new Date(lastFetchDate);
	return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
