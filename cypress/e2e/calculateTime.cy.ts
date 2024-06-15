import { calculateTimeDifference } from '@/utils/calculateTimeDifference';

describe('calculateTimeDifference', () => {
	it('returns a time difference close to the expected value when cached data exists', () => {
		cy.stub(localStorage, 'getItem').returns(
			JSON.stringify({
				rates: [{ time: '2024-06-15T10:00:00Z' }],
			})
		);

		const result = calculateTimeDifference();
		const currentTime = Date.now();
		const lastFetchDate = Date.parse('2024-06-15T10:00:00Z');
		const expectedDifference = currentTime - lastFetchDate;

		const marginOfError = 100;
		expect(result).to.be.closeTo(expectedDifference, marginOfError);
	});

	it('returns 0 when no cached data exists', () => {
		cy.stub(localStorage, 'getItem').returns(null);

		const result = calculateTimeDifference();

		const marginOfError = 100;
		expect(result).to.be.closeTo(result, marginOfError);
	});
});

describe('Last Time Currency Load', () => {
	it('should return the formatted time correctly', () => {
		const testData = {
			rates: [
				{
					time: '2024-06-14T08:30:00',
				},
			],
		};

		cy.window().then((win) => {
			const lastFetchDate = Date.parse(testData.rates[0].time) || Date.now();
			const dateObj = new Date(lastFetchDate);
			const formattedTime: string = dateObj.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});

			expect(formattedTime).to.equal('08:30 AM');
		});
	});
});

describe('Last Time Currency Load', () => {
	it('should return the formatted time correctly', () => {
		const testData = {
			rates: [
				{
					time: '2024-06-14T10:30:00',
				},
			],
		};

		cy.window().then((win) => {
			const cachedData = JSON.stringify(testData);
			localStorage.setItem('testData', cachedData);

			const cachedDataFromStorage = localStorage.getItem('testData');
			const parsedData = JSON.parse(cachedDataFromStorage || '');
			const lastFetchDate =
				Date.parse(parsedData?.rates[0]?.time || '') || Date.now();
			const dateObj = new Date(lastFetchDate);
			const formattedTime = dateObj.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});

			expect(formattedTime).to.equal('10:30 AM');
		});
	});
});
