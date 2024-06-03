import React, { Component } from 'react';

import { fetchHistoricalData } from '@/api/currency';
import { BasicItem } from '@/components/basicItem';
import { Chart } from '@/components/Chart';
import { DataPicker } from '@/components/DatePicker';
import { Modal } from '@/components/modalCustom';
import { SelectAsset } from '@/components/SelectAssets';
import { DataAssets } from '@/constants/dataAssets';
import { IProps, IState } from '@/pages/timeLine/index.interface';
import { formatDateToISOString } from '@/utils/formattedDate.helper';

import * as styles from './styles.module.scss';

class TimeLineClass extends Component<IProps, IState> {
	constructor(props) {
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
		const { currentAsset, selectedStartDate, selectedEndDate } = this.state;
		if (
			currentAsset !== prevState.currentAsset ||
			selectedStartDate !== prevState.selectedStartDate ||
			selectedEndDate !== prevState.selectedEndDate
		) {
			this.fetchData();
		}
	}

	handleEndDate = (date: Date): void => {
		this.setState((prevState) => ({
			...prevState,
			selectedEndDate: formatDateToISOString(date),
			isModalActive: false,
		}));
	};

	handleAsset = (value: string) => {
		this.setState((prevState) => ({ ...prevState, currentAsset: value }));
	};

	handleStartDate = (date: Date) => {
		this.setState((prevState) => ({
			...prevState,
			selectedStartDate: formatDateToISOString(date),
		}));
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
			</div>
		);
	}
}

export default TimeLineClass;
