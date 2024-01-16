import request from 'supertest';
import { expect } from 'chai';
import { describe, before } from 'mocha';
import { app } from '../../src/app.js';


let ingredientId: any;

describe('POST /ingredients', function () {
  this.timeout(5000);
  it('Se crea un ingrediente correctamente', async () => {
    const ingredient = {
      "ingredient": "IngredientePrueba",
      "description": "Descripción del ingrediente de prueba"
    }
    
    // const response = await axios.post(url, ingredient);
    const response = await request(app).post('/api/ingredients').send(ingredient).expect(201);
    ingredientId = response.body._id;
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('ingredient');
    expect(response.body).to.have.property('description');
    expect(response.body.ingredient).to.be.equal('IngredientePrueba');
    expect(response.body.description).to.be.equal('Descripción del ingrediente de prueba');
    
  })
});

describe('GET /ingredients', function () {
  this.timeout(5000);
  it('Se obtienen todos los ingredientes correctamente', async () => {
    const response = await request(app).get('/api/ingredients').expect(200);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('ingredient');
    expect(response.body[0]).to.have.property('description');
  });

  it('Se obtiene un ingrediente concreto a partir de su id', async () => {
    const response = await request(app).get(`/api/ingredients/${ingredientId}`).expect(200);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.be.an('object');
    expect(response.body[0]).to.have.property('ingredient');
    expect(response.body[0]).to.have.property('description');
    expect(response.body[0].ingredient).to.be.equal('IngredientePrueba');
    expect(response.body[0].description).to.be.equal('Descripción del ingrediente de prueba');
  });
  
});

describe('PATCH /ingredients/:ingredient_id', function () {
  this.timeout(5000);
  it('Se modifica un ingrediente correctamente', async () => {
    const ingredient = {
      "ingredient": "IngredientePruebaModificado",
      "description": "Descripción del ingrediente de prueba modificado"
    }
    const response = await request(app).patch(`/api/ingredients/${ingredientId}`).send(ingredient).expect(200);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('ingredient');
    expect(response.body).to.have.property('description');
    expect(response.body.ingredient).to.be.equal('IngredientePruebaModificado');
    expect(response.body.description).to.be.equal('Descripción del ingrediente de prueba modificado');
  });
});


describe('DELETE /ingredients/:ingredient_id', function () {
  this.timeout(5000);
  it('Se elimina un ingrediente correctamente', async () => {
    const response = await request(app).delete(`/api/ingredients/${ingredientId}`).expect(200);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('ingredient');
    expect(response.body).to.have.property('description');
    expect(response.body.ingredient).to.be.equal('IngredientePruebaModificado');
    expect(response.body.description).to.be.equal('Descripción del ingrediente de prueba modificado');
  });
});


