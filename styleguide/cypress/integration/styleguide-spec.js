describe('styleguide', () => {
  it('works', () => {
    cy.on('uncaught:exception', () => {
      return false;
    });
    cy.visit('');
    cy.get('header').contains('Design System');
    cy.get('h1').contains('README');
    cy.get('a').contains('Input').click();
    cy.get('h2').contains('Input');
  });
});
