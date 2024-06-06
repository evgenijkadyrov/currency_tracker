import { useCalendar } from '@/hooks/useCalendar';

import * as styles from './styles.module.scss';

export interface ICalendarProps {
	onSelectDate: (date: Date) => void;
}
const weekdays = ['Sun', 'Mon', 'Th', 'Wed', 'Tus', 'Fri', 'Sat'];

export const Calendar = ({ onSelectDate }: ICalendarProps) => {
	const {
		currentDate,
		selectedDay,
		handleDateClick,
		showPreviousMonth,
		showNextMonth,
	} = useCalendar({ onSelectDate });

	const renderCalendar = () => {
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const firstDay = new Date(year, month, 1).getDay();

		const weekdaysMarkup = weekdays.map((weekday) => (
			<th key={weekday}>{weekday}</th>
		));

		const calendarCells = [];
		let row = [];
		for (let i = 0; i < firstDay; i += 1) {
			row.push(
				<td key={`empty-${i}`} aria-hidden="true">
					&nbsp;
				</td>
			);
		}
		for (let day = 1; day <= daysInMonth; day += 1) {
			const isSelected = day === selectedDay;
			row.push(
				<td
					key={day}
					onClick={() => handleDateClick(day)}
					className={isSelected ? styles.selected : ''}
				>
					{day}
				</td>
			);
			if (row.length === 7) {
				calendarCells.push(<tr key={`row-${day}`}>{row}</tr>);
				row = [];
			}
		}
		if (row.length > 0) {
			calendarCells.push(<tr key="row-last">{row}</tr>);
		}

		return (
			<div className={styles.calendar}>
				<table>
					<thead>
						<tr>
							<th colSpan={7}>
								<button type="button" onClick={showPreviousMonth}>
									{'<'}
								</button>
								{currentDate.toLocaleString('default', {
									month: 'long',
									year: 'numeric',
								})}
								<button type="button" onClick={showNextMonth}>
									{'>'}
								</button>
							</th>
						</tr>
						<tr>{weekdaysMarkup}</tr>
					</thead>
					<tbody>{calendarCells}</tbody>
				</table>
			</div>
		);
	};

	return <div className="calendar">{renderCalendar()}</div>;
};
