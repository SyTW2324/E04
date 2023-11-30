
// cypress/integration/home_spec.js

describe('Home Component', () => {
  beforeEach(() => {
    cy.visit('http://10.6.128.69:8080/');
  });

  it('renders home page with buttons', () => {
    cy.contains('h1', 'Home');
    cy.get('button').should('have.length', 4);
  });

  it('navigates to Login page on button click', () => {
    cy.contains('Ir a Login').click();
    cy.url().should('include', '/login');
  });

  it('navigates to Register page on button click', () => {
    cy.contains('Ir a Register').click();
    cy.url().should('include', '/register');
  });

  it('navigates to Upload Recipe page on button click', () => {
    cy.contains('Ir a subir receta').click();
    cy.url().should('include', '/upload-recipe');
  });

  it('navigates to Profile page on button click', () => {
    cy.contains('Ir al perfil').click();
    cy.url().should('include', '/profile');
  });
});
