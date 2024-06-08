import { IHistoricalDate } from '@/api/currency';
import {
	HIGH_SCALE,
	LOW_SCALE,
	MAX_SCALE,
	MIN_SCALE,
	STEP,
} from '@/constants/gradeForScale';
import { useFormattedValue } from '@/hooks/useFormattedValue';
import {
	CHART_BACKGROUND_DARK, CHART_BACKGROUND_LIGHT,
	CHART_CANDLESTICK_BLUE,
	CHART_CANDLESTICK_GREEN,
	CHART_CANDLESTICK_RED,
	CHART_CROSSHAIR_ORANGE,
	CHART_GRID_GREY, CHART_LIGHT_GREY,
} from '@/styles/colors';

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
				ctx.strokeStyle = CHART_CROSSHAIR_ORANGE;

				ctx.moveTo(line.startX, line.startY);
				ctx.lineTo(line.endX, line.endY);
				ctx.stroke();
			});
			ctx.fillStyle = CHART_GRID_GREY;
			ctx.fillRect(crosshair.endX, crosshair[0].startY - 12, right, 20);
			ctx.font = 'bold';
			ctx.textAlign = 'center';
			ctx.fillStyle = CHART_CROSSHAIR_ORANGE;
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
const plugin = {
	id: 'customCanvasBackgroundColor',
	beforeDraw: (chart:any, args:any, options:any) => {
		const {ctx} = chart;
		ctx.save();
		ctx.globalCompositeOperation = 'destination-over';
		ctx.fillStyle = options.color || '#99ffff';
		ctx.fillRect(0, 0, chart.width, chart.height);
		ctx.restore();
	}
};
const plug = {
	id: 'getElement',
	events:['click'],
	beforeEvent(chart:any, args:any) {
		const {event} = args;

		if (event.type === 'click') {
			// chart.data.datasets[1].data[0][0]=2
			// chart.update();
			// const xClick = chart.scales.x.getValueForPixel(event.native.offsetX);
			// const barElement = chart.getDatasetMeta(0).data[xClick];
		}
	},




};
export const getOptions = (historicalData: IHistoricalDate[],theme: string) => {
	const { char1, char2 } = useFormattedValue(historicalData);
	let minScale = MIN_SCALE;
	let maxScale = MAX_SCALE;
	let stepSize = STEP;
	if (char1) {
		minScale = Math.min(...char1.flat(2)) * LOW_SCALE;
		maxScale = Math.max(...char2.flat(2)) * HIGH_SCALE;
		stepSize = minScale * 0.001;
	}
	let chartBackground;
	if (theme === 'dark') {
		chartBackground = CHART_BACKGROUND_DARK;
	} else {
		chartBackground = CHART_BACKGROUND_LIGHT;
	}
	return {
		plugins: {
			customCanvasBackgroundColor: {
				color: chartBackground,
			},
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
							`open: ${ctx[0].raw[0].toFixed(3)}`,
							`close: ${ctx[0].raw[1].toFixed(3)}`,
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
			backgroundColor: chartBackground,
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
					color:chartColors.colorScaleY
				},
				stacked: false,
				min: minScale,
				max: maxScale,
				stepSize,
			},
		},

	};
};
export const plugins: any = [hoverCrossHair, plugin,plug];
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
				backgroundColor: CHART_CANDLESTICK_BLUE,
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
						? CHART_CANDLESTICK_GREEN
						: CHART_CANDLESTICK_RED;
				},
				stack: 'Stack 0',
			},
			{
				barPercentage: 1,
				barThickness: 1,
				data: char3,
				backgroundColor: CHART_CANDLESTICK_BLUE,
				stack: 'Stack 0',
			},
		],
	};
};

