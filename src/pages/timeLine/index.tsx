import React, { useContext, useEffect, useState } from 'react';

import { fetchHistoricalData } from '@/api/currency';
import { DataPicker } from '@/components/DatePicker';
import { Modal } from '@/components/modalCustom';
import { SelectAsset } from '@/components/SelectAssets';
import { ThemeContext } from '@/components/theme';
import { DataAssets } from '@/constants/dataAssets';
import { formatDateToISOString } from '@/utils/formattedDate.helper';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

const TimeLine = () => {
	const { theme } = useContext(ThemeContext);
	const [currentAsset, setCurrentAsset] = useState('USDT');
	const currencySymbols = Object.keys(DataAssets);
	const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
		null
	);
	const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
	const [isModalActive, setModalActive] = useState(false);

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

	const handleAsset = (value: string) => {
		setCurrentAsset(value);
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetchHistoricalData(
					'USDT',
					currentAsset,
					selectedStartDate,
					selectedEndDate
				);
			} catch (e) {
				throw new Error(e);
			}
		};

		fetchData();
	}, [currentAsset, selectedStartDate, setSelectedEndDate]);

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
