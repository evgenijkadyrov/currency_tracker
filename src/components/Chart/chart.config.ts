import { IHistoricalDate } from '@/api/currency';

const useFormattedValue = (historicalData: IHistoricalDate[]) => {
	const formattedData = historicalData.reverse();
	const labels = formattedData.reverse().map((element) => {
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
		labels,
		char1,
		char3,
		char2,
	};
};
export const getOptions = (historicalData: IHistoricalDate[]) => {
	const { char1, char2 } = useFormattedValue(historicalData);
	let minScale = 0;
	let maxScale = 1;
	let stepSize = 0.1;
	if (char1) {
		minScale = Math.min(...char1.flat(2)) * 0.97;
		maxScale = Math.max(...char2.flat(2)) * 1.03;
		stepSize = minScale * 0.001;
	}
	return {
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: 'Chart of assets',
			},
		},

		responsive: true,
		scales: {
			x: {
				reverse: true,
				ticks: {
					reverse: true,
					callback(labels: string, index: number) {
						return index % 2 === 0 ? this.getLabelForValue(labels) : '';
					},
				},
				stacked: true,
			},
			y: {
				position: 'right' as const,
				ticks: {
					stepSize,

					color: 'white',
				},

				stacked: false,
				min: minScale,
				max: maxScale,
				stepSize,
			},
		},
	};
};

export const getData = (historicalData: IHistoricalDate[]) => {
	const { char1, char2, char3, labels } = useFormattedValue(historicalData);
	return {
		labels,
		datasets: [
			{
				barPercentage: 1,
				barThickness: 1,
				categoryPercentage: 1,
				data: char1,
				backgroundColor: 'rgb(81,82,208)',
				stack: 'Stack 0',
			},
			{
				barPercentage: 1,
				barThickness: 10,
				minBarLength: 1,
				data: char2,
				backgroundColor: (ctx: any): string => {
					if (
						ctx === undefined ||
						ctx.raw === undefined ||
						ctx.raw.length < 2
					) {
						return 'rgba(0, 0, 0, 0)';
					}
					return ctx.raw[1] > ctx.raw[0]
						? 'rgba(22, 199, 130)'
						: 'rgba(234, 57, 67)';
				},
				stack: 'Stack 0',
			},
			{
				barPercentage: 1,
				barThickness: 1,
				data: char3,
				backgroundColor: 'rgb(81,82,208)',
				stack: 'Stack 0',
			},
		],
	};
};
