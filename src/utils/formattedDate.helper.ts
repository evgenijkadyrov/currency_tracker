export const formatDateToISOString = (dateString: Date): string => {
	const date = new Date(dateString);
	return date.toISOString();
};
