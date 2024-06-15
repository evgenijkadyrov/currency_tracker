import { formatDateToISOString } from '@/utils/formattedDate.helper';

describe('formatDateToISOString', () => {
	it('returns the correct ISO string for a valid date', () => {
		const validDate = new Date('2024-06-15T12:00:00Z');
		const isoString = formatDateToISOString(validDate);
		expect(isoString).to.equal('2024-06-15T12:00:00.000Z');
	});

	it('returns an empty string for null input', () => {
		const isoString = formatDateToISOString(null);
		expect(isoString).to.equal('');
	});
});
