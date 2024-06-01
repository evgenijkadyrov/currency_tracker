import React, { useContext, useState } from 'react';

import { DataPicker } from '@/components/DatePicker';
import { Modal } from '@/components/modalCustom';
import { SelectAsset } from '@/components/SelectAssets';
import { ThemeContext } from '@/components/theme';
import { DataAssets } from '@/constants/dataAssets';
import { getLinkClass } from '@/utils/getLinkClass.helper';

import * as styles from './styles.module.scss';

const TimeLine = () => {
	const { theme } = useContext(ThemeContext);
	const [currentAsset, setCurrentAsset] = useState('USDT');
	const currencySymbols = Object.keys(DataAssets);
	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
	const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
	const [isModalActive, setModalActive] = useState(false);

	const handleModalClose = () => {
		setModalActive(false);
	};
	const handleStartDate = (date: Date) => {
		setSelectedStartDate(date);
	};
	const handleOpenModal = () => {
		setModalActive(true);
	};
	const handleEndDate = (date: Date) => {
		setSelectedEndDate(date);
	};

	const handleAsset = (value: string) => {
		setCurrentAsset(value);
	};
	// useEffect(() => {
	//   const fetchData = async () => {
	//     try {
	//
	//     } catch (e) {
	//       throw new Error(e);
	//     }
	//   };
	//
	//   fetchData();
	// }, []);

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
			<div>{selectedEndDate}</div>
			<div>{selectedStartDate}</div>
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
