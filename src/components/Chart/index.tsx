import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';

import { IHistoricalDate } from '@/api/currency';
import { getData, getOptions } from '@/components/Chart/chart.config';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface IChart {
	historicalData: IHistoricalDate[];
}

export const Chart = ({ historicalData }: IChart) => {
	const options = getOptions(historicalData);
	const data = getData(historicalData);
	return (
		<div>
			<Bar data={data} options={options} />
		</div>
	);
};
