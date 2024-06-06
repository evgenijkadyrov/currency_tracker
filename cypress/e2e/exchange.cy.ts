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
