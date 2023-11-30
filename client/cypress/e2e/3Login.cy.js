
// cypress/integration/login_form_spec.ts

describe('Login Form Component', () => {
  beforeEach(() => {
    cy.visit('http://10.6.128.69:8080/login');
  });

  it('renders login form and submits successfully', () => {
    // Verifica que los elementos del formulario estén presentes
    cy.get('.email').should('exist');
    cy.get('.password-login').should('exist');
    cy.get('button').should('exist');

    // Completa el formulario
    cy.get('.email').type('daniel');
    cy.get('.password-login').type('12345');

    // Envía el formulario
    cy.get('form').submit();

    // Verifcamos que se haya redirigido a la página del perfil del usuario, /profile
    cy.url().should('include', '/profile');

    // esperamos que la página se cargue
    cy.wait(1000);


    // Verificamos quue existe un <p> que ctiene como indicador username y que el texto del mismo es el nombre de usuario
    cy.get('p#username').should('have.text', 'daniel');
    cy.get('p#email').should('have.text', 'daniel@gmail.com');
    cy.get('p#first_name').should('have.text', 'Daniel');
    cy.get('p#last_name').should('have.text', 'Gomez');
    cy.get('p#profile_description').should('have.text', 'Soy informatico');

    
  });
});
