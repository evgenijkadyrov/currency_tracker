export const formatDateToISOString = (dateString: Date | null): string => {
	if (dateString) {
		const date = new Date(dateString);
		return date.toISOString();
	}
	return '';
};
