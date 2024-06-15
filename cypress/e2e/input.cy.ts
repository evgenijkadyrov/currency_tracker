describe('Input Component', () => {
	beforeEach(() => {
		cy.visit('path/to/your/component'); // Replace with the actual path to your component
	});

	it('should render an input element with the provided props', () => {
		const inputProps = {
			type: 'text',
			name: 'username',
			value: 'JohnDoe',
			className: 'input-field',
			onChange: cy.stub().as('handleChange'),
			placeholder: 'Enter your username',
			disabled: false,
		};
		cy.visit('/timeline');
		cy.get('[data-test="input"]').as('inputElement');

		cy.get('@inputElement').should('have.attr', 'type', inputProps.type);
		cy.get('@inputElement').should('have.attr', 'name', inputProps.name);
		cy.get('@inputElement').should('have.attr', 'value', inputProps.value);
		cy.get('@inputElement').should('have.class', inputProps.className);
		cy.get('@inputElement').should(
			'have.attr',
			'placeholder',
			inputProps.placeholder
		);
		cy.get('@inputElement').should('not.have.attr', 'disabled');

		cy.get('@inputElement').type('30');
		cy.get('@handleChange').should('have.been.calledOnce');
		cy.get('@handleChange').should('have.been.calledWith', 30);
	});

	it('should disable the input element when disabled prop is true', () => {
		const inputProps = {
			type: 'text',
			name: 'username',
			value: '',
			className: 'input-field',
			onChange: cy.stub().as('handleChange'),
			placeholder: 'Enter your username',
			disabled: true,
		};

		cy.get('input').as('inputElement');

		cy.get('@inputElement').should('have.attr', 'disabled');
	});
});
