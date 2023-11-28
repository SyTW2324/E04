import request from 'supertest';
import { expect } from 'chai';
import { app } from '../../../src/app.js';
import axios from 'axios';
import { User } from '../../../src/models/userModel.js';
import { doesNotReject } from 'assert';
import mongoose from 'mongoose';

// SI NO FUNCIONA ES PORQUE EN EL PACKAGE PUSIMOS DEV Y NO TEST


describe('POST /users', () => {
  it('Se crea un usuario correctamente', async () => {
    const url = 'http://10.6.128.69:8080/api/users';
    const userFacu = {
      "username": "faculito",
      "first_name": "Facundo",
      "last_name": "Garcia",
      "email": "facu@gmail.com",
      "password": "1234"
    }
    
    const response = await axios.post(url, userFacu);
    expect(response.status).to.be.equal(201);
    // expect(response.data).to.be.an('object');
    // expect(response.data).to.have.property('username');
    // expect(response.data).to.have.property('first_name');
    // expect(response.data).to.have.property('last_name');
    // expect(response.data).to.have.property('email');
    // expect(response.data).to.have.property('password');
  });

});


describe('GET /users', () => {
  it('Se obtienen todos los usuarios correctamente', async () => {
    const url = 'http://10.6.128.69:8080/api/users';
    const response = await axios.get(url);
    expect(response.status).to.be.equal(200);
    expect(response.data.length).to.be.equal(1);   
  });
});


describe('PATCH /users/:username', () => {


  it('Se modifica un usuario correctamente', async () => {

    // conseguimos el token primero
    const urlToken = "http://10.6.128.69:8080/api/users/login";
    const userFacuLogin = {
      "username": "faculito",
      "password": "1234"
    }
    const responseToken = await axios.post(urlToken, userFacuLogin);
    const token = responseToken.data.token;

    const url = "http://10.6.128.69:8080/api/users/faculito";
    const userFacu = {
      "first_name": "DonFaucundo",
      "last_name": "DonGarcia"
    }
    const response = await axios.patch(url, userFacu, { headers: { Authorization: `Bearer ${token}` } });
    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('username');
    expect(response.data).to.have.property('first_name');
    expect(response.data).to.have.property('last_name');
    expect(response.data).to.have.property('email');
    expect(response.data).to.have.property('password');
  });
});


describe('DELETE /users/:username', () => {
  it('Se elimina un usuario correctamente', async () => {
    const urlToken = "http://10.6.128.69:8080/api/users/login";
    const userFacuLogin = {
      "username": "faculito",
      "password": "1234"
    }
    const responseToken = await axios.post(urlToken, userFacuLogin);
    const token = responseToken.data.token;

    
    const url = "http://10.6.128.69:8080/api/users/faculito";
    const response = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
    expect(response.status).to.be.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('username');
    expect(response.data).to.have.property('first_name');
    expect(response.data).to.have.property('last_name');
    expect(response.data).to.have.property('email');
    expect(response.data).to.have.property('password');
  }
  );
} );

