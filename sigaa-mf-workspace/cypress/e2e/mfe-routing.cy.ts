Cypress.on('uncaught:exception', () => false);
describe('Module Federation routing', () => {

  it('carrega MFE users via shell', () => {
    cy.visit('http://localhost:4200/users');
    cy.contains('Usuário').should('exist');
  });

  it('carrega MFE access-control via shell', () => {
    cy.visit('http://localhost:4200/access-control');
    cy.contains('Permissão').should('exist');
  });
});