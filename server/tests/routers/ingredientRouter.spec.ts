import request from 'supertest';
import { expect } from 'chai';
import { describe, before } from 'mocha';
import { app } from '../../src/app.js';
import axios from 'axios';
import { User } from '../../src/models/userModel.js';
import { doesNotReject } from 'assert';
import mongoose from 'mongoose';

let ingredientId: any;

describe('POST /ingredients', () => {
  it('Se crea un ingrediente correctamente', async () => {
    const ingredient = {
      "ingredient": "IngredientePrueba",
      "description": "Descripción del ingrediente de prueba"
    }
    
    // const response = await axios.post(url, ingredient);
    const response = await request(app).post('/api/ingredients').send(ingredient).expect(201);
    // ingredientId = response.data._id;
    // expect(response.status).to.be.equal(201);
    // expect(response.data).to.be.an('object');
    // expect(response.data).to.have.property('ingredient');
    // expect(response.data).to.have.property('description');
    // expect(response.data.ingredient).to.be.equal('IngredientePrueba');
    // expect(response.data.description).to.be.equal('Descripción del ingrediente de prueba');
  })
});

// describe('GET /ingredients', () => {
//   it('Se obtienen todos los ingredientes correctamente', async () => {
//     const url = 'https://teal-monkey-hem.cyclic.app/api/ingredients';
//     const response = await axios.get(url);
//     expect(response.status).to.be.equal(200);
//     expect(response.data.length).to.be.greaterThan(1);
//   });

//   it('Se obtiene un ingrediente correctamente', async () => {
//     const url = `https://teal-monkey-hem.cyclic.app/api/ingredients/${ingredientId}`;
//     const response = await axios.get(url);
//     expect(response.status).to.be.equal(200);
//     expect(response.data[0]).to.be.an('object');
//     expect(response.data[0]).to.have.property('ingredient');
//     expect(response.data[0]).to.have.property('description');
//     expect(response.data[0].ingredient).to.be.equal('IngredientePrueba');
//     expect(response.data[0].description).to.be.equal('Descripción del ingrediente de prueba');
//   });
// });

// describe('PATCH /ingredients/:ingredient_id', () => {
//   it('Se modifica un ingrediente correctamente', async () => {
//     const url = `https://teal-monkey-hem.cyclic.app/api/ingredients/${ingredientId}`;
//     const ingredient = {
//       "ingredient": "IngredientePruebaModificado",
//       "description": "Descripción del ingrediente de prueba modificado"
//     }
//     const response = await axios.patch(url, ingredient);
//     expect(response.status).to.be.equal(200);
//     expect(response.data).to.be.an('object');
//     expect(response.data).to.have.property('ingredient');
//     expect(response.data).to.have.property('description');
//     expect(response.data.ingredient).to.be.equal('IngredientePruebaModificado');
//     expect(response.data.description).to.be.equal('Descripción del ingrediente de prueba modificado');
//   });
// });

// describe('DELETE /ingredients/:ingredient_id', () => {
//   it('Se elimina un ingrediente correctamente', async () => {
//     const url = `https://teal-monkey-hem.cyclic.app/api/ingredients/${ingredientId}`;
//     const response = await axios.delete(url);
//     expect(response.status).to.be.equal(200);
//     expect(response.data).to.be.an('object');
//     expect(response.data).to.have.property('ingredient');
//     expect(response.data).to.have.property('description');
//     expect(response.data.ingredient).to.be.equal('IngredientePruebaModificado');
//     expect(response.data.description).to.be.equal('Descripción del ingrediente de prueba modificado');
//   });
// });

