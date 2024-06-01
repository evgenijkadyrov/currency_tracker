import React, { Dispatch, SetStateAction } from 'react';

import Calendar from '@/components/Сalendar';

import * as styles from './styles.module.scss';

interface IDataPickerActions {
	handleStartDate: Dispatch<SetStateAction<Date | null>>;
	handleEndDate: Dispatch<SetStateAction<Date | null>>;
}

export const DataPicker = ({
	handleStartDate,

	handleEndDate,
}: IDataPickerActions) => (
	<div className={styles.container}>
		{/* <label htmlFor="start-date">Дата начала:</label> */}
		{/* <input type="text" id="start-date" value={selectedStartDate?.toLocaleDateString() || ''} readOnly /> */}
		<Calendar onSelectDate={handleStartDate} />

		{/* <label htmlFor="end-date">Дата конца:</label> */}
		{/* <input type="text" id="end-date" value={selectedEndDate?.toLocaleDateString() || ''} readOnly /> */}
		<Calendar onSelectDate={handleEndDate} />
	</div>
);
