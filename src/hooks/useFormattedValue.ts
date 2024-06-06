import { IHistoricalDate } from '@/api/currency';

export const useFormattedValue = (historicalData: IHistoricalDate[]) => {
	const formattedData = historicalData.reverse();
	const days = formattedData.reverse().map((element) => {
		const date = new Date(element.time_period_start);
		return date.toLocaleDateString('en-US', { day: 'numeric' });
	});
	const char1: Array<Array<number>> = formattedData.map((element) => [
		element.rate_low,
		element.rate_close < element.rate_open
			? element.rate_close
			: element.rate_open,
	]);
	const char2: Array<Array<number>> = formattedData.map((element) => [
		element.rate_open,
		element.rate_close,
	]);
	const char3: Array<Array<number>> = formattedData.map((element) => [
		element.rate_close,
		element.rate_high,
	]);
	return {
		labels: days,
		char1,
		char3,
		char2,
	};
};
