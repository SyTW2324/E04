
// cypress/integration/login_form_spec.ts

describe('Register Form Component', () => {
  beforeEach(() => {
    cy.visit('http://10.6.128.69:8080/register');
  });

  it('renders login form and submits successfully', () => {
    // Verifica que los elementos del formulario estén presentes
    cy.get('#username').should('exist');
    cy.get('#email').should('exist');
    cy.get('#password-1').should('exist');
    cy.get('#password-2').should('exist');
    cy.get('#first_name').should('exist');
    cy.get('#last_name').should('exist');
    cy.get('#profile_description').should('exist');

    // Completa el formulario
    cy.get('#username').type('daniel');
    cy.get('#email').type('daniel@gmail.com');
    cy.get('#first_name').type('Daniel');
    cy.get('#last_name').type('Gomez');
    cy.get('#profile_description').type('Soy informatico');
    cy.get('#password-1').type('12345');
    cy.get('#password-2').type('12345');


    // Envía el formulario haciendo click en el boton de registrarse
    cy.get('#button-register').click();


  });
});
