import { IHistoricalDate } from '@/api/currency';
import { useFormattedValue } from '@/hooks/useFormattedValue';

let crosshair: any;
const hoverCrossHair = {
	id: 'hoverCrossHair',
	events: ['mouseMove'],
	beforeDatasetsDraw(chart: any) {
		if (crosshair) {
			const {
				ctx,
				chartArea: { right },
				scales: { y },
			} = chart;
			ctx.save();
			crosshair?.forEach((line: any) => {
				ctx.beginPath();
				ctx.setLineDash([3, 3]);
				ctx.setLineWidth = 2;
				ctx.strokeStyle = 'orange';
				ctx.moveTo(line.startX, line.startY);
				ctx.lineTo(line.endX, line.endY);
				ctx.stroke();
			});
			ctx.fillStyle = 'grey';
			ctx.fillRect(crosshair.endX, crosshair[0].startY - 12, right, 20);
			ctx.font = 'bold 14px';
			ctx.textAlign = 'center';

			ctx.fillStyle = 'orange';
			ctx.fillText(
				y.getValueForPixel(crosshair[0].startY).toFixed(3),
				right - 20,
				crosshair[0].startY
			);
			ctx.restore();
		}
	},

	afterEvent(chart: any, args: any): void {
		const {
			chartArea: { left, right },
		} = chart;
		const yCoor = args.event.y;

		if (!args.inChartArea && crosshair) {
			crosshair = undefined;
			args.changed = true;
		} else if (args.inChartArea) {
			crosshair = [
				{
					startX: left,
					startY: yCoor,
					endX: right,
					endY: yCoor,
				},
			];
			args.changed = true;
		}
	},
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
			tooltip: {
				callbacks: {
					beforeBody: (ctx: any): string[] => {
						const bodyArray = [
							` ${ctx[0].raw[0].toFixed(3)}`,
							` ${ctx[0].raw[1].toFixed(2)}`,
						];
						return bodyArray;
					},
					label: (): string => '',
				},
			},
		},

		responsive: true,
		layout: {
			padding: {
				left: 10,
			},
		},
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
export const plugins: any = [hoverCrossHair];
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
				barThickness: 'flex' as const,
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
