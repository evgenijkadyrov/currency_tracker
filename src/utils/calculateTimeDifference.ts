export const TIME_FOR_RELOAD = 60000;

export const calculateTimeDifference = () => {
	const currentTime = Date.now();
	const cachedData = localStorage.getItem('currencyData');
	const parsedData = cachedData !== null ? JSON.parse(cachedData) : null;
	const lastFetchDate = parsedData?.rates[0].time
		? Date.parse(parsedData.rates[0].time)
		: 0;
	return currentTime - lastFetchDate;
};

export const lastTimeCurrencyLoad = () => {
	const cachedData = localStorage.getItem('currencyData');
	const parsedData =
		typeof cachedData === 'string' ? JSON.parse(cachedData) : null;
	const lastFetchDate = Date.parse(parsedData?.rates[0].time) || Date.now();
	const dateObj = new Date(lastFetchDate);
	return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
