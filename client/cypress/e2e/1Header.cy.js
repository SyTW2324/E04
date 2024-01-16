
describe('Componente Header', () => {
  beforeEach(() => {
    cy.visit('https://tasty-bite-sytw.netlify.app/');
  });

  it('debe tener un header', () => {
    cy.get('header').should('exist');
  });

  it('debe tener un logo', () => {
    cy.get('img.logo').should('exist');
  });

  it('debe tener un enlace a la página de inicio', () => {
    cy.get('a[href="/"]').find('img.logo').should('exist');
  });

  it('Debe contener los botones de Log in y Sign in', () => {
    cy.get('a[href="/login"]').should('exist');
    cy.get('a[href="/register"]').should('exist');
  });

});