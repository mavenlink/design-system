describe('styleguide', () => {
  it('works', () => {
    cy.visit('');
    cy.get('header').contains('Design System');
  });
});
