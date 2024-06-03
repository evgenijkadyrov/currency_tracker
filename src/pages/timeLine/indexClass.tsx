import React, { Component } from 'react';

import { fetchHistoricalData } from '@/api/currency';
import { BasicItem } from '@/components/basicItem';
import { Chart } from '@/components/Chart';
import { DataPicker } from '@/components/DatePicker';
import { Modal } from '@/components/modalCustom';
import { Notification } from '@/components/Notification';
import { NotificationDisplay } from '@/components/NotificationDisplay';
import { SelectAsset } from '@/components/SelectAssets';
import { DataAssets } from '@/constants/dataAssets';
import { IProps, IState } from '@/pages/timeLine/index.interface';
import { formatDateToISOString } from '@/utils/formattedDate.helper';

import * as styles from './styles.module.scss';

export const calculateDateDiff = (
	startDate: string,
	endDate: string
): number => {
	const diff = Date.parse(endDate) - Date.parse(startDate);
	return diff / 1000 / 3600 / 24;
};

class TimeLineClass extends Component<IProps, IState> {
	private notification = new Notification();

	constructor(props: IProps) {
		super(props);
		this.state = {
			currentAsset: 'EUR',
			currencySymbols: Object.keys(DataAssets),
			selectedStartDate: null,
			selectedEndDate: null,
			isModalActive: false,
			historicalData: [],
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps: IProps, prevState: IState) {
		const { currentAsset, selectedEndDate } = this.state;
		if (
			currentAsset !== prevState.currentAsset ||
			selectedEndDate !== prevState.selectedEndDate
		) {
			this.fetchData();
		}
	}

	handleStartDate = (date: Date) => {
		this.setState((prevState) => ({
			...prevState,
			selectedStartDate: formatDateToISOString(date),
		}));
	};

	handleEndDate = (date: Date): void => {
		const { selectedStartDate } = this.state;
		const endDate = formatDateToISOString(date);
		this.notification.setDiff(calculateDateDiff(selectedStartDate, endDate));
		this.setState((prevState) => ({
			...prevState,
			selectedEndDate: endDate,
			isModalActive: false,
		}));
	};

	handleAsset = (value: string) => {
		this.setState((prevState) => ({ ...prevState, currentAsset: value }));
	};

	handleOpenModal = () => {
		this.setState((prevState) => ({ ...prevState, isModalActive: true }));
	};

	handleModalClose = () => {
		this.setState((prevState) => ({ ...prevState, isModalActive: false }));
	};

	fetchData = async () => {
		try {
			const { currentAsset, selectedStartDate, selectedEndDate } = this.state;
			const result = await fetchHistoricalData(
				'USDT',
				currentAsset,
				selectedStartDate,
				selectedEndDate
			);
			this.setState((prevState) => ({ ...prevState, historicalData: result }));
		} catch (e) {
			throw new Error(e);
		}
	};

	render() {
		const { currentAsset, currencySymbols, isModalActive, historicalData } =
			this.state;

		return (
			<div className={styles.container}>
				<SelectAsset
					name="timeLineOption"
					id="TimeLineOption"
					className={styles.select}
					defaultValue={currentAsset}
					options={currencySymbols}
					onChange={this.handleAsset}
				/>

				<button
					type="button"
					onClick={this.handleOpenModal}
					className={styles.button}
				>
					Select date period
				</button>
				<div className={styles.containerItem}>
					<BasicItem
						key={currentAsset}
						name={DataAssets[currentAsset].title}
						icon={DataAssets[currentAsset].icon}
					/>
				</div>

				<Chart historicalData={historicalData} />
				{isModalActive && (
					<Modal
						title="some modal title"
						onClose={this.handleModalClose}
						size={{ width: '700px', height: '350px' }}
					>
						<DataPicker
							handleStartDate={this.handleStartDate}
							handleEndDate={this.handleEndDate}
						/>
					</Modal>
				)}
				<NotificationDisplay notification={this.notification} />
			</div>
		);
	}
}

export default TimeLineClass;
