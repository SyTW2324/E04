import request from 'supertest';
import { expect } from 'chai';
import { describe, before } from 'mocha';
import { app } from '../../src/app.js';
import axios from 'axios';
import { User } from '../../src/models/userModel.js';
import { doesNotReject } from 'assert';
import mongoose from 'mongoose';

let idRecipe = '';
let idRecipe2 = '';
let tokenRonaldo = '';

describe('POST /recipes', function() {
  this.timeout(10000);
  it('Se crea una receta correctamente', async () => {
    const userRonaldo = {
      "username": "ronaldo",
      "first_name": "Ronaldo",
      "last_name": "Cristiano",
      "email": "ronaldo@gmail.com",
      "password": "ronaldo"
    }
    await User.create(userRonaldo);
    const userLogin = {
      "username": "ronaldo",
      "password": "ronaldo"
    }
    const responseLogin = await request(app).post('/api/users/login').send(userLogin);
    const token = responseLogin.body.token;
    tokenRonaldo = responseLogin.body.token;
    const recipe = {
      "title": "Bocadillo",
      "category": "65a5263edb5e13122515dd7f",
      "ingredients": [],
      "instructions": ["Paso de prueba"],
      "images": [],
      "time": "10",
      "number_servings": "2",
      "difficulty": "easy",
      "interactions": []
    }
    const recipe2 = {
      "title": "Bocadillo2",
      "category": "65a5263edb5e13122515dd7f",
      "ingredients": [],
      "instructions": ["Paso de prueba"],
      "images": [],
      "time": "10",
      "number_servings": "2",
      "difficulty": "easy",
      "interactions": []
    }
    const response = await request(app).post('/api/recipes').send(recipe).set('Authorization', `Bearer ${token}`);
    const response2 = await request(app).post('/api/recipes').send(recipe2).set('Authorization', `Bearer ${token}`);
    idRecipe = response.body.recipe_id;
    idRecipe2 = response2.body.recipe_id;
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('category');
    expect(response.body).to.have.property('ingredients');
    expect(response.body).to.have.property('instructions');
    expect(response.body).to.have.property('images');
    expect(response.body).to.have.property('time');
    expect(response.body).to.have.property('number_servings');
    expect(response.body).to.have.property('difficulty');
    expect(response.body).to.have.property('interactions');
  });
});


  
describe('GET /recipes', function () {
  this.timeout(100000);
  it('Se obtienen todas las recetas correctamente', async () => {
    const response = await request(app).get('/api/recipes');
    expect(response.status).to.be.equal(200);
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('Se puede obtener una receta por su id', async () => {
    const response = await request(app).get(`/api/recipes/${idRecipe}`);
    expect(response.status).to.be.equal(200);
    expect(response.body[0]).to.have.property('title');
    expect(response.body[0].title).to.be.equal('Bocadillo');
    expect(response.body[0]).to.have.property('category');
    expect(response.body[0]).to.have.property('ingredients');
    expect(response.body[0]).to.have.property('instructions');
    expect(response.body[0].instructions[0]).to.be.equal('Paso de prueba');
    expect(response.body[0]).to.have.property('images');
    expect(response.body[0]).to.have.property('time');
    expect(response.body[0]).to.have.property('number_servings');
    expect(response.body[0]).to.have.property('difficulty');
    expect(response.body[0]).to.have.property('interactions');

  });

  it('Se puede obtener una receta por su id', async () => {
    const response = await request(app).get(`/api/recipes?recipe_id=${idRecipe2}`);
    expect(response.status).to.be.equal(200);
    expect(response.body[0].title).to.be.equal('Bocadillo2');
    expect(response.body[0]).to.have.property('category');
    expect(response.body[0]).to.have.property('ingredients');
    expect(response.body[0]).to.have.property('instructions');
    expect(response.body[0].instructions[0]).to.be.equal('Paso de prueba');
    expect(response.body[0]).to.have.property('images');
    expect(response.body[0]).to.have.property('time');
    expect(response.body[0]).to.have.property('number_servings');
    expect(response.body[0]).to.have.property('difficulty');
  });
});

describe('PATCH /recipes/:recipe_id', function() {
  this.timeout(100000);
  it('Se modifica una receta correctamente (body)', async () => {
    const recipe = {
      "title": "BocadilloModificado"
    }
    const response = await request(app).patch(`/api/recipes/${idRecipe}`).send(recipe).set('Authorization', `Bearer ${tokenRonaldo}`);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('title');
    expect(response.body.title).to.be.equal('BocadilloModificado');
  });

  it('Se modifica una receta correctamente (query)', async () => {
    const recipe = {
      "title": "BocadilloModificado"
    }
    const response = await request(app).patch(`/api/recipes?recipe_id=${idRecipe2}`).send(recipe).set('Authorization', `Bearer ${tokenRonaldo}`);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('title');
    expect(response.body.title).to.be.equal('BocadilloModificado');
  });

  it('Falla al intentar modificar una receta que no existe', async () => {
    const recipe = {
      "title": "BocadilloModificado"
    }
    const response = await request(app).patch(`/api/recipes/123456789`).send(recipe).set('Authorization', `Bearer ${tokenRonaldo}`);
    expect(response.status).to.be.equal(500);
  });

  it('Falla al intentar modificar una receta un parametro no permitido', async () => {
    const recipe = {
      "recipe_id": "123456789",
      "title": "BocadilloModificado"
    }
    const response = await request(app).patch(`/api/recipes/${idRecipe}`).send(recipe).set('Authorization', `Bearer ${tokenRonaldo}`);
    expect(response.status).to.be.equal(400);
  });
});


describe('DELETE /recipes/:recipe_id & /recipes?recipe_id=id', function () {
  this.timeout(10000);
  it('Se elimina una receta correctamente (body)', async () => {
    const response = await request(app).delete(`/api/recipes/${idRecipe}`).set('Authorization', `Bearer ${tokenRonaldo}`);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('category');
    expect(response.body).to.have.property('ingredients');
    expect(response.body).to.have.property('instructions');
    expect(response.body).to.have.property('images');
    expect(response.body).to.have.property('time');
    expect(response.body).to.have.property('number_servings');
    expect(response.body).to.have.property('difficulty');
    expect(response.body).to.have.property('interactions');
  });

  it('Se elimina una receta correctamente (query)', async () => {
    const response = await request(app).delete(`/api/recipes?recipe_id=${idRecipe2}`).set('Authorization', `Bearer ${tokenRonaldo}`);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('category');
    expect(response.body).to.have.property('ingredients');
    expect(response.body).to.have.property('instructions');
    expect(response.body).to.have.property('images');
    expect(response.body).to.have.property('time');
    expect(response.body).to.have.property('number_servings');
    expect(response.body).to.have.property('difficulty');
    expect(response.body).to.have.property('interactions');
    await request(app).delete(`/api/users/ronaldo`).set('Authorization', `Bearer ${tokenRonaldo}`);

  });
  it('No se elimina la receta porque no se pasa ningun id', async () => {
    const response = await request(app).delete(`/api/recipes/`).set('Authorization', `Bearer ${tokenRonaldo}`);
    expect(response.status).to.be.equal(400);
  });
});
