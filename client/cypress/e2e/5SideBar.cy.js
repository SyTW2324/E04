
describe('Componente SideBar', () => {
  beforeEach(() => {
    cy.visit('https://tasty-bite-sytw.netlify.app/');
    cy.get('img.lines').click();

  });

  it('debe tener los enlaces correctos a las diferentes secciones de la página', () => {
    cy.contains('a.sidebar-button', 'Home').should('exist');
    cy.contains('a.sidebar-button', 'Log In').should('exist');
    cy.contains('a.sidebar-button', 'Sign In').should('exist');
    cy.contains('a.sidebar-button', 'Subir receta').should('exist');
    cy.contains('a.sidebar-button', 'Recetas').should('exist');
    cy.contains('a.sidebar-button', 'Categorías').should('exist');
    cy.contains('a.sidebar-button', 'Ingredientes').should('exist');
    cy.contains('a.sidebar-button', 'Sobre nosotros').should('exist');
    cy.contains('a.sidebar-button', 'Mi perfil').should('exist');
  });

  it('debe tener el botón de cerrar sesión', () => {
    cy.get('button.logout-button').should('exist');
  });
 
  it('debe navegar a la página correcta al hacer clic en Home', () => {
    cy.contains('a.sidebar-button', 'Home').click();
    cy.url().should('include', '/');
  });

  it('debe navegar a la página correcta al hacer clic en Log In', () => {
    cy.contains('a.sidebar-button', 'Log In').click();
    cy.url().should('include', '/login');
  });

  it('debe navegar a la página correcta al hacer clic en Sign In', () => {
    cy.contains('a.sidebar-button', 'Sign In').click();
    cy.url().should('include', '/register');
  });


});