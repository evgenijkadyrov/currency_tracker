import { IHistoricalDate } from '@/api/currency';

export interface IState {
	currentAsset: string;
	currencySymbols: string[];
	selectedStartDate: string | null;
	selectedEndDate: string | null;
	isModalActive: boolean;
	historicalData: IHistoricalDate[];
	limit: number;
	inputValue: string;
	dataReceived: boolean;
}
export type IProps = Record<string, never>;
