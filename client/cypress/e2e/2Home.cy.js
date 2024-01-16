

describe('Componente principal Home', () => {

  it('Se renderiza correctamente la página principal, junto con un título', () => {
    cy.visit('https://tasty-bite-sytw.netlify.app/');
    cy.get('h1');
    cy.contains('h2', '¿Tienes alguna receta que deseas compartir?');
    cy.contains('p');
  });

  it('Se renderiza correctamente el header de la página', () => {
    cy.visit('https://tasty-bite-sytw.netlify.app/');
    cy.get('header');
  });

  it('Se renderiza correctamente el footer de la página', () => {
    cy.visit('https://tasty-bite-sytw.netlify.app/');
    cy.get('footer');
  });

});

    
//   it('Se renderiza correctamente la página principal, junto con un título', () => {
//     cy.visit('https://tasty-bite-sytw.netlify.app/');
//     cy.contains('h1', 'Home');
//     cy.get('button').should('have.length', 4);
//   });
  
//   it('Se navega a una subpágina Login gracias a hacer click en el botón correspondiente', () => {
//     cy.visit('https://tasty-bite-sytw.netlify.app/');
//     cy.contains('Ir a Login').click();
//     cy.url().should('include', '/login');
//   });

//   it('Se navega a una subpágina Register gracias a hacer click en el botón correspondiente', () => {
//     cy.visit('https://tasty-bite-sytw.netlify.app/');
//     cy.contains('Ir a Register').click();
//     cy.url().should('include', '/register');
//   });

//   it('Se navega a una subpágina Upload-Recipe gracias a hacer click en el botón correspondiente', () => {
//     cy.visit('https://tasty-bite-sytw.netlify.app/');
//     cy.contains('Ir a subir receta').click();
//     cy.url().should('include', '/upload-recipe');
//   });

//   it('Se navega a una subpágina Profile gracias a hacer click en el botón correspondiente', () => {
//     cy.visit('https://tasty-bite-sytw.netlify.app/');
//     cy.contains('Ir al perfil').click();
//     cy.url().should('include', '/profile');
//   });
// });
