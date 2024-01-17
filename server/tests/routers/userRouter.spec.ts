import request from 'supertest';
import { expect } from 'chai';
import { describe } from 'mocha';
import { app } from '../../src/app.js';
import axios from 'axios';
import { User } from '../../src/models/userModel.js';
import { doesNotReject } from 'assert';
import mongoose from 'mongoose';
import { cpuUsage } from 'process';


let tokenMessi = '';
let tokenRonaldo = '';
  

describe('POST /users', function() {
  this.timeout(100000);
  it('Se crea un usuario correctamente Messi', async () => {
    const userMessi = {
      "username": "messi",
      "first_name": "Messi",
      "last_name": "Lionel",
      "email": "messi@gmail.com",
      "password": "messi"
    }
    const response = await request(app).post('/api/users').send(userMessi);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('username');
    expect(response.body).to.have.property('first_name');
    expect(response.body).to.have.property('last_name');
    expect(response.body).to.have.property('email');
    expect(response.body).to.have.property('password');
  });


  it('Se crea un usuario correctamente Ronaldo', async () => {
    const userRonaldo = {
      "username": "ronaldo",
      "first_name": "Cristiano",
      "last_name": "Ronaldo",
      "email": "ronaldo@gmail.com",
      "password": "ronaldo"
    }
    const response2 = await request(app).post('/api/users').send(userRonaldo);
    expect(response2.body).to.be.an('object');
    expect(response2.body).to.have.property('username');
    expect(response2.body).to.have.property('first_name');
    expect(response2.body).to.have.property('last_name');
    expect(response2.body).to.have.property('email');
    expect(response2.body).to.have.property('password');
  });

  it('No se puede loguear un usuario que no existe', async () => {
    const userFalso = {
      "username": "pepe%&%·&&",
      "password": "12345"
    }
    const response = await request(app).post('/api/users/login').send(userFalso);
    expect(response.status).to.be.equal(400);
  });
  
});

describe('GET /users', function () {
  this.timeout(100000);
  it('Se obtienen todos los usuarios correctamente', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).to.be.equal(200);
    expect(response.body.length).to.be.greaterThan(1);
    
  });

  it('Se obtiene un usuario correctamente con query', async () => {
    const response = await request(app).get('/api/users?username=messi');
    expect(response.status).to.be.equal(200);
    expect(response.body.length).to.be.equal(1);
  });
  

  it('Se obtiene un usuario correctamente por parametro', async () => {
    const userLoginMessi = {
      "username": "messi",
      "password": "messi"
    }
    const responseLoginMessi = await request(app).post('/api/users/login').send(userLoginMessi);
    tokenMessi = responseLoginMessi.body.token;
    const response = await request(app).get('/api/users/messi').set('Authorization', `Bearer ${tokenMessi}`);
    expect(response.status).to.be.equal(200);
    expect(response.body.length).to.be.equal(1);
  });
});



describe('PATCH /users/:username', function () {
  this.timeout(10000);
  it('Se modifica un usuario correctamente (body)', async () => {

    // conseguimos el token primero
    const userLoginMessi = {
      "username": "messi",
      "password": "messi"
    }
    const responseLoginMessi = await request(app).post('/api/users/login').send(userLoginMessi);
    tokenMessi = responseLoginMessi.body.token;

    const userMessi = {
      "first_name": "Lionel",
      "last_name": "Cuccitini"
    }

    const response = await request(app).patch('/api/users/messi').send(userMessi).set('Authorization', `Bearer ${tokenMessi}`);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('username');
    expect(response.body.username).to.be.equal('messi');
    expect(response.body).to.have.property('first_name');
    expect(response.body.first_name).to.be.equal('Lionel');
    expect(response.body).to.have.property('last_name');
    expect(response.body.last_name).to.be.equal('Cuccitini');

  });

  it('Se modifica un usuario correctamente (query)', async () => {

    // conseguimos el token primero
    const userLoginRonaldo = {
      "username": "ronaldo",
      "password": "ronaldo"
    }
    const responseLoginRonaldo = await request(app).post('/api/users/login').send(userLoginRonaldo);
    tokenRonaldo = responseLoginRonaldo.body.token;
    const userRonaldo = {
      "first_name": "Antonio",
      "last_name": "Rodriguez"
    }

    const response = await request(app).patch('/api/users?username=ronaldo').send(userRonaldo).set('Authorization', `Bearer ${tokenRonaldo}`);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('username');
    expect(response.body.username).to.be.equal('ronaldo');
    expect(response.body).to.have.property('first_name');
    expect(response.body.first_name).to.be.equal('Antonio');
    expect(response.body).to.have.property('last_name');
    expect(response.body.last_name).to.be.equal('Rodriguez');

  });
});


describe('DELETE /users/:username', function () {
  this.timeout(10000);
  it('Se elimina un usuario correctamente (body)', async () => {
    const userLoginMessi = {
      "username": "messi",
      "password": "messi"
    }
    const responseLogin = await request(app).post('/api/users/login').send(userLoginMessi);
    tokenMessi = responseLogin.body.token;
    
    const responseMessi = await request(app).delete('/api/users/messi').set('Authorization', `Bearer ${tokenMessi}`);
    expect(responseMessi.status).to.be.equal(200);
    expect(responseMessi.body).to.be.an('object');
    expect(responseMessi.body).to.have.property('username');
    expect(responseMessi.body.username).to.be.equal('messi');
    expect(responseMessi.body).to.have.property('first_name');
    
  });

  it('Se elimina un usuario correctamente (query)', async () => {
    const userLoginRonaldo = {
      "username": "ronaldo",
      "password": "ronaldo"
    }
    const responseLogin = await request(app).post('/api/users/login').send(userLoginRonaldo);
    tokenRonaldo = responseLogin.body.token;
    
    const responseRonaldo = await request(app).delete('/api/users?username=ronaldo').set('Authorization', `Bearer ${tokenRonaldo}`);
    expect(responseRonaldo.status).to.be.equal(200);
    expect(responseRonaldo.body).to.be.an('object');
    expect(responseRonaldo.body).to.have.property('username');
    expect(responseRonaldo.body.username).to.be.equal('ronaldo');
    expect(responseRonaldo.body).to.have.property('first_name');
    
  });

  it('No se elimina correctamente un usuario que no existe', async () => {
    const responseRonaldo = await request(app).delete('/api/users?username=ronald').set('Authorization', `Bearer ${tokenRonaldo}`);
    expect(responseRonaldo.status).to.be.equal(404);
    
  });
    
});

