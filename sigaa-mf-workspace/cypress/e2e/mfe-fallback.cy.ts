Cypress.on('uncaught:exception', () => false);
describe('MFE fallback', () => {

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });

  it('renderiza fallback quando access-control não responde', () => {

    cy.intercept('GET', 'http://localhost:4203/**', {
      forceNetworkError: true
    });

    cy.visit('http://localhost:4200/access-control');

    cy.contains('Módulo indisponível').should('exist');

  });

});