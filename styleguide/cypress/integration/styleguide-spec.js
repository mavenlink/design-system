describe('styleguide', () => {
  it('works', () => {
    cy.visit('');
    cy.get('header').contains('Design System');
    cy.get('h1').contains('Overview');
    cy.get('a').contains('Input').click();
    cy.get('h2').contains('Input');
  });
});
