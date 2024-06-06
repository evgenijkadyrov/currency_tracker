import { Dispatch, SetStateAction } from 'react';

import { Calendar } from '@/components/Сalendar';

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
		<Calendar onSelectDate={handleStartDate} />
		<Calendar onSelectDate={handleEndDate} />
	</div>
);
