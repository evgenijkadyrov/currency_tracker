import { Calendar } from '@/components/Сalendar';

import * as styles from './styles.module.scss';

interface IDataPickerActions {
	handleStartDate: (date: Date | null) => void;
	handleEndDate: (date: Date | null) => void;
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
