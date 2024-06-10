import React, { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Colors,
	Filler,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';

import { IHistoricalDate } from '@/api/currency';
import { getData, getOptions, plugins } from '@/components/Chart/chart.config';
import { useTheme } from '@/hooks/useTheme';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	Colors
);

interface IChart {
	historicalData: IHistoricalDate[];
}

export const Chart = memo(({ historicalData }: IChart) => {
	const { theme } = useTheme();

	const options = getOptions(historicalData, theme);
	const data = getData(historicalData);
	return (
		<div>
			<Bar data={data} options={options} plugins={plugins} />
		</div>
	);
});
