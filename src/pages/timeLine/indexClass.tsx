import React, { ChangeEvent, Component } from 'react';

import { fetchHistoricalData } from '@/api/currency';
import { BasicItem } from '@/components/basicItem';
import { Chart } from '@/components/Chart';
import { DataPicker } from '@/components/DatePicker';
import { Input } from '@/components/Input';
import { Modal } from '@/components/modalCustom';
import { notification, Observer } from '@/components/Notification';
import { NotificationComponent } from '@/components/NotificationComponent';
import { SelectAsset } from '@/components/SelectAssets';
import { DataAssets } from '@/constants/dataAssets';
import { IProps, IState } from '@/pages/timeLine/index.interface';
import { formatDateToISOString } from '@/utils/formattedDate.helper';

import * as styles from './styles.module.scss';

class TimeLineClass extends Component<IProps, IState> implements Observer {
	constructor(props: IProps) {
		super(props);
		this.state = {
			currentAsset: 'EUR',
			currencySymbols: Object.keys(DataAssets),
			selectedStartDate: null,
			selectedEndDate: null,
			isModalActive: false,
			historicalData: [],
			limit: 100,
			inputValue: '',
			dataReceived: false,
		};
	}

	override componentDidMount() {
		this.fetchData();
		notification.attach(this);
	}

	override componentDidUpdate(prevProps: IProps, prevState: IState) {
		const { currentAsset, selectedEndDate, limit } = this.state;
		if (
			currentAsset !== prevState.currentAsset ||
			selectedEndDate !== prevState.selectedEndDate ||
			limit !== prevState.limit
		) {
			this.fetchData();
		}
	}

	componentWillUnmount() {
		notification.detach(this);
	}

	update = () => {
		const { limit, dataReceived } = this.state;
		return { limit, dataReceived };
	};

	handleStartDate = (date: Date) => {
		this.setState((prevState) => ({
			...prevState,
			selectedStartDate: formatDateToISOString(date),
		}));
	};

	handleEndDate = (date: Date): void => {
		const endDate = formatDateToISOString(date);
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

	handleCreateChart = () => {
		const { inputValue } = this.state;
		this.setState((prevState) => ({
			...prevState,
			limit: Number(inputValue),
		}));
	};

	handleModalClose = () => {
		this.setState((prevState) => ({ ...prevState, isModalActive: false }));
	};

	handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState((prevState) => ({
			...prevState,
			inputValue: e.target.value,
		}));
	};

	fetchData = async () => {
		try {
			const { currentAsset, selectedStartDate, selectedEndDate, limit } =
				this.state;
			const result = await fetchHistoricalData(
				'USDT',
				currentAsset,
				selectedStartDate,
				selectedEndDate,
				limit
			);
			this.setState((prevState) => ({
				...prevState,
				historicalData: result,
				dataReceived: true,
			}));
			notification.notifyObservers();
		} catch (e) {
			throw new Error(e);
		}
	};

	render() {
		const { currentAsset, currencySymbols, isModalActive, historicalData } =
			this.state;
		const { inputValue } = this.state;
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
				<Input
					type="input"
					name="count days"
					value={inputValue}
					className={styles.button}
					onChange={this.handleChangeInput}
					placeholder="enter days"
				/>
				<button
					type="button"
					onClick={this.handleCreateChart}
					className={styles.button}
				>
					Create chart for month
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
				<NotificationComponent onDataLoaded={this.update} />
			</div>
		);
	}
}

export default TimeLineClass;
