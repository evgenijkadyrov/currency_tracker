describe('Input Component', () => {
	it('should update input value on change', () => {
		const inputValue = 'Test Input';

		cy.visit('/banks');

		cy.get('[data-test="input"]').type(inputValue);

		cy.get('[data-test="input"]').should('have.value', inputValue);
	});
});
