

describe('Componente para el inicio de sesión de un usuario', () => {

  it('Se verifica que los elementos del formulario estén presentes', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app/login');
    cy.get('.email').should('exist');
    cy.get('.password-login').should('exist');
    cy.get('button').should('exist');
  });
  
  it('Se introducen valores en los campos correspondientes, se envía el formulario correctamente y se verifca que se haya redirigido a la página del perfil del usuario, /profile', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app/login');
    cy.get('.email').type('usertest');
    cy.get('.password-login').type('12345');
    cy.get('form').submit();
    cy.url().should('include', '/profile');
    cy.wait(1000);
    cy.get('p#username').should('have.text', 'usertest');
    cy.get('p#email').should('have.text', 'usertest@gmail.com');
    cy.get('p#first_name').should('have.text', 'usertest');
    cy.get('p#last_name').should('have.text', 'Rodriguez');
    cy.get('p#profile_description').should('have.text', 'Soy informatico');
  });

  it('Se introducen valores sin el nombre de usuario para que no se pueda iniciar sesión', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app/login');
    cy.get('.password-login').type('12345');
  });
  
  it('Se envía el formulario correctamente y no se accede a la página del perfil del usuario, ya que da un error', () => {
    cy.visit('https://resilient-crostata-07c0da.netlify.app/login');
    cy.get('form').submit();
    cy.url().should('include', '/login');
  });
});