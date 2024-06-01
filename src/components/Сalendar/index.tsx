import React, { useState } from 'react';

import * as styles from './styles.module.scss';

interface CalendarProps {
	onSelectDate: (date: Date) => void;
}

const Calendar = ({ onSelectDate }: CalendarProps) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDay, setSelectedDay] = useState(null);

	const showPreviousMonth = () => {
		setCurrentDate((prevDate) => {
			const prevMonth = prevDate.getMonth() - 1;
			return new Date(prevDate.getFullYear(), prevMonth, 1);
		});
	};

	const showNextMonth = () => {
		setCurrentDate((prevDate) => {
			const nextMonth = prevDate.getMonth() + 1;
			return new Date(prevDate.getFullYear(), nextMonth, 1);
		});
	};

	const handleDateClick = (day: number) => {
		const selectedDate = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			day
		);
		onSelectDate(selectedDate);
		setSelectedDay(day);
	};

	const renderCalendar = () => {
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const firstDay = new Date(year, month, 1).getDay();

		const weekdays = ['Sun', 'Mon', 'Th', 'Wed', 'Tus', 'Fri', 'Sat'];
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

export default Calendar;
