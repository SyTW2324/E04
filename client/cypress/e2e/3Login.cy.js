

describe('Componente para el inicio de sesión de un usuario', () => {
  it('Se carga correctamente cada campo con su debido valor', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app');
    cy.contains('Ir a Register').click();
    cy.url().should('include', '/register');
    cy.get('#username').type('usertest');
    cy.get('#email').type('usertest@gmail.com');
    cy.get('#first_name').type('usertest');
    cy.get('#last_name').type('Rodriguez');
    cy.get('#profile_description').type('Soy informatico');
    cy.get('#password-1').type('12345');
    cy.get('#password-2').type('12345');
    cy.get('#button-register').click();
  });
  
  it('Se verifica que los elementos del formulario estén presentes', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app');
    cy.contains('Ir a Login').click();
    cy.url().should('include', '/login');
    cy.get('.email').should('exist');
    cy.get('.password-login').should('exist');
    cy.get('button').should('exist');
  });
  
  it('Se introducen valores en los campos correspondientes, se envía el formulario correctamente y se verifica que se haya redirigido a la página del perfil del usuario, /profile', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app');
    cy.contains('Ir a Login').click();
    cy.url().should('include', '/login');
    cy.get('.email').type('usertest');
    cy.get('.password-login').type('12345');
    cy.get('form').submit();
    cy.wait(200);
    cy.url().should('include', '/profile');
    cy.get('p#username').should('have.text', 'usertest');
    cy.get('p#email').should('have.text', 'usertest@gmail.com');
    cy.get('p#first_name').should('have.text', 'usertest');
    cy.get('p#last_name').should('have.text', 'Rodriguez');
    cy.get('p#profile_description').should('have.text', 'Soy informatico');
  }); 

  it('Se introducen valores sin el nombre de usuario para que no se pueda iniciar sesión', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app');
    cy.contains('Ir a Login').click();
    cy.url().should('include', '/login');
    cy.get('.password-login').type('12345');
  });
  
  it('Se envía el formulario correctamente y no se accede a la página del perfil del usuario, ya que da un error', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app');
    cy.contains('Ir a Login').click();
    cy.url().should('include', '/login');
    cy.get('form').submit();
    cy.url().should('include', '/login');
  });
});