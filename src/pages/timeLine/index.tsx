import React, { useContext, useEffect, useState } from 'react';

import { fetchHistoricalData, IHistoricalDate } from '@/api/currency';
import { Chart } from '@/components/Chart';
import { Modal } from '@/components/Modal';
import { ThemeContext } from '@/components/Theme';
import { BasicItem } from '@/components/ui/BasicItem';
import { DataPicker } from '@/components/ui/DatePicker';
import { SelectAsset } from '@/components/ui/SelectAssets';
import { DataAssets } from '@/constants/dataAssets';
import { formatDateToISOString } from '@/utils/formattedDate.helper';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

const TimeLine = () => {
	const { theme } = useContext(ThemeContext);
	const [currentAsset, setCurrentAsset] = useState('EUR');
	const currencySymbols = Object.keys(DataAssets);
	const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
		null
	);
	const [limit, setLimit] = useState(100);
	const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
	const [isModalActive, setModalActive] = useState(false);
	const [historicalData, setHistoricalData] = useState<IHistoricalDate[]>([]);

	const handleModalClose = () => {
		setModalActive(false);
	};
	const handleStartDate = (date: Date) => {
		setSelectedStartDate(formatDateToISOString(date));
	};
	const handleOpenModal = () => {
		setModalActive(true);
	};
	const handleEndDate = (date: Date) => {
		setSelectedEndDate(formatDateToISOString(date));
	};
	const handleChangeLimit = () => {
		setLimit(30);
	};

	const handleAsset = (value: string) => {
		setCurrentAsset(value);
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchHistoricalData(
					'USDT',
					currentAsset,
					selectedStartDate,
					selectedEndDate,
					limit
				);
				setHistoricalData(result);
			} catch (e) {
				throw new Error(e);
			}
		};

		fetchData();
	}, [currentAsset, selectedStartDate, selectedEndDate]);

	return (
		<div
			className={getLinkClass(styles.container, styles.containerDark, theme)}
		>
			<SelectAsset
				name="timeLineOption"
				id="TimeLineOption"
				className={styles.select}
				defaultValue={currentAsset}
				options={currencySymbols}
				onChange={handleAsset}
			/>

			<button type="button" onClick={handleOpenModal} className={styles.button}>
				Select date period
			</button>
			<button
				type="button"
				onClick={handleChangeLimit}
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
					onClose={handleModalClose}
					size={{ width: '700px', height: '350px' }}
				>
					<DataPicker
						handleStartDate={handleStartDate}
						handleEndDate={handleEndDate}
					/>
				</Modal>
			)}
		</div>
	);
};

export default TimeLine;
