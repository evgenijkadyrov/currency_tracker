describe('Navigation Test', () => {
	it('should navigate to timeline page and verify input field and chart', () => {
		cy.visit('/');

		cy.contains('Timeline').click();
		cy.url().should('be.equal', 'http://localhost:3000/timeline');
		cy.get('[name="timeLineOption"]').should('exist');
		cy.get('[name="count days"]').should('exist');
		cy.get('[name="count days"]').type('30');
	});
});
