

describe('Componente para el registro de usuario', () => {

  it('Se renderiza correctamente el contenido de la página', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app/register');
    cy.get('#username').should('exist');
    cy.get('#email').should('exist');
    cy.get('#password-1').should('exist');
    cy.get('#password-2').should('exist');
    cy.get('#first_name').should('exist');
    cy.get('#last_name').should('exist');
    cy.get('#profile_description').should('exist');
  }); 

  it('Se carga correctamente cada campo con su debido valor', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app/register');
    cy.get('#username').type('usertest');
    cy.get('#email').type('usertest@gmail.com');
    cy.get('#first_name').type('usertest');
    cy.get('#last_name').type('Rodriguez');
    cy.get('#profile_description').type('Soy informatico');
    cy.get('#password-1').type('12345');
    cy.get('#password-2').type('12345');
    cy.get('#button-register').click();
  });

  it('Se cargan todos los valores menos uno para que de error', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app/register');
    cy.get('#username').type('usertest');
    cy.get('#email').type('usertest@gmail.com');
    cy.get('#first_name').type('usertest');
    cy.get('#profile_description').type('Soy informatico');
    cy.get('#password-1').type('12345');
    cy.get('#password-2').type('12345');
    cy.get('#button-register').click();
    cy.get('.error-message').should('have.text', '   Por favor, ingrese un apellido.   ');
  });
});


