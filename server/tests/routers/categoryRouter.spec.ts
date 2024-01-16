import request from 'supertest';
import { expect } from 'chai';
import { describe, before } from 'mocha';
import { app } from '../../src/app.js';
import axios from 'axios';
import { User } from '../../src/models/userModel.js';
import { doesNotReject } from 'assert';
import mongoose from 'mongoose';

let categoryId: any;
let categoryId2: any;


describe('POST /categories', function() {
  this.timeout(5000);

  it('Se crea una categoria correctamente', async () => {
    const category = {
      "category": "CategoriaPrueba",
      "description": "Descripción de la categoria de prueba"
    }
    const category2 = {
      "category": "CategoriaPrueba2",
      "description": "Descripción de la categoria de prueba2"
    }
    
    const response = await request(app).post('/api/categories').send(category);
    const response2 = await request(app).post('/api/categories').send(category2);
    categoryId = response.body._id;
    categoryId2 = response2.body._id;
    expect(response.body).to.have.property('category');
    expect(response.body).to.have.property('description');
    expect(response.body.category).to.be.equal('CategoriaPrueba');
    expect(response.body.description).to.be.equal('Descripción de la categoria de prueba');
  })
});

describe('GET /categories', function () {
  this.timeout(5000);
  it('Se obtienen todas las categorias correctamente', async () => {
    const response = await request(app).get('/api/categories').expect(200);
    expect(response.status).to.be.equal(200);
    expect(response.body.length).to.be.greaterThan(1);
  });
  
  it('Se obtiene una categoria correctamente', async () => {
    const response = await request(app).get(`/api/categories/${categoryId}`).expect(200);
    expect(response.status).to.be.equal(200);
    expect(response.body[0]).to.have.property('category');
    expect(response.body[0]).to.have.property('description');
    expect(response.body[0].category).to.be.equal('CategoriaPrueba');
    expect(response.body[0].description).to.be.equal('Descripción de la categoria de prueba');
  });

});

describe('PATCH /categories/:category_id & /categories?category_id=id', function () {
  this.timeout(5000);
  it('Se modifica una categoria correctamente', async () => {
    const category = {
      "category": "CategoriaPruebaModificada",
      "description": "Descripción de la categoria de prueba modificada"
    }
    
    const category2 = {
      "category": "CategoriaPruebaModificada2",
      "description": "Descripción de la categoria de prueba modificada2"
    }

    const response = await request(app).patch(`/api/categories/${categoryId}`).send(category);
    const response2 = await request(app).patch(`/api/categories?category_id=${categoryId2}`).send(category2);

    expect(response.body).to.have.property('category');
    expect(response.body).to.have.property('description');
    expect(response.body.category).to.be.equal('CategoriaPruebaModificada');
    expect(response.body.description).to.be.equal('Descripción de la categoria de prueba modificada');


    expect(response2.body).to.have.property('category');
    expect(response2.body).to.have.property('description');
    expect(response2.body.category).to.be.equal('CategoriaPruebaModificada2');
    expect(response2.body.description).to.be.equal('Descripción de la categoria de prueba modificada2');
  });
});



describe('DELETE /categories/:category_id & /categories?category_id=id', function () {
  this.timeout(5000);
  it('Se elimina una categoria correctamente', async () => {
    const response = await request(app).delete(`/api/categories/${categoryId}`);
    const response2 = await request(app).delete(`/api/categories?category_id=${categoryId2}`);

    expect(response.body).to.have.property('category');
    expect(response.body).to.have.property('description');
    expect(response.body.category).to.be.equal('CategoriaPruebaModificada');
    expect(response.body.description).to.be.equal('Descripción de la categoria de prueba modificada');

    expect(response2.body).to.have.property('category');
    expect(response2.body).to.have.property('description');
    expect(response2.body.category).to.be.equal('CategoriaPruebaModificada2');
    expect(response2.body.description).to.be.equal('Descripción de la categoria de prueba modificada2');
  });

  it('Se elimina una categoria correctamente', async () => {
    const response = await request(app).delete(`/api/categories/${categoryId}`);
    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('msg');
  });
});
