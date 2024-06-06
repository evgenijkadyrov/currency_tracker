import { useState } from 'react';

interface ICalendarProps {
	onSelectDate: (date: Date) => void;
}
interface IUseCalendar {
	currentDate: Date;
	selectedDay: number | null;
	handleDateClick: (day: number) => void;
	showPreviousMonth: () => void;
	showNextMonth: () => void;
}
export const useCalendar = ({ onSelectDate }: ICalendarProps): IUseCalendar => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDay, setSelectedDay] = useState<number | null>(null);

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

	return {
		currentDate,
		selectedDay,
		handleDateClick,
		showPreviousMonth,
		showNextMonth,
	};
};
