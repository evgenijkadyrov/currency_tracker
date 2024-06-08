describe('converter ', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should open modal', () => {
		cy.get('[data-testid="open-modal-button"]').click({
			multiple: true,
			force: true,
		});

		cy.get('[name="fromCurrencyInput"]').should('be.visible');
	});
});
describe('converter ', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should open modal', () => {
		cy.get('[data-testid="open-modal-button"]').click({
			multiple: true,
			force: true,
		});

		cy.get('[name="fromCurrencyInput"]').should('be.visible');
	});
});
// describe('ExchangeBlock component', () => {
// 	it('should display the correct result of exchange', () => {
// 		// Stub the exchange rate API response
// 		cy.intercept('GET', '/api/exchange', { rate: 1.5 }).as('getExchange');
//
// 		// Render the ExchangeBlock component
// 		cy.visit('/');
// 		cy.get('[data-testid="open-modal-button"]').click({
// 			multiple: true,
// 			force: true,
// 		}).as('exchangeBlock');
//
// 		// Select currency options and enter amount
// 		cy.get('@exchangeBlock')
// 			.get('select[name="fromCurrencyOption"]')
// 			.select('EUR');
// 		cy.get('@exchangeBlock')
// 			.get('select[name="toCurrencyOption"]')
// 			.select('USDT');
// 		cy.get('@exchangeBlock')
// 			.get('input[name="fromCurrencyInput"]')
// 			.type('100');
//
// 		cy.wait('@getExchange');
// 		cy.get('@exchangeBlock')
// 			.get('input[name="resultExchange"]')
// 			.should('have.value', '109.0354'); // Replace with the expected result based on the mocked exchange rate
// 	});
// });