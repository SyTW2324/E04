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
      const url = 'https://teal-monkey-hem.cyclic.app/api/users';
      const userMessi = {
        "username": "messi",
        "first_name": "Messi",
        "last_name": "Lionel",
        "email": "messi@gmail.com",
        "password": "messi"
      }
      
      const response = await axios.post(url, userMessi);
      expect(response.status).to.be.equal(201);
      expect(response.data).to.be.an('object');
      expect(response.data).to.have.property('username');
      expect(response.data).to.have.property('first_name');
      expect(response.data).to.have.property('last_name');
      expect(response.data).to.have.property('email');
      expect(response.data).to.have.property('password');
    });
    
  });


  describe('GET /users', () => {
    it('Se obtienen todos los usuarios correctamente', async () => {
      const url = 'https://teal-monkey-hem.cyclic.app/api/users';
      const response = await axios.get(url);
      expect(response.status).to.be.equal(200);
      expect(response.data.length).to.be.equal(1);   
    });
  });


  describe('PATCH /users/:username', () => {

    it('Se modifica un usuario correctamente', async () => {

      // conseguimos el token primero
      const urlToken = "https://teal-monkey-hem.cyclic.app/api/users/login";
      const userMessiLogin = {
        "username": "messi",
        "password": "messi"
      }
      const responseToken = await axios.post(urlToken, userMessiLogin);
      const token = responseToken.data.token;

      const url = "https://teal-monkey-hem.cyclic.app/api/users/messi";
      const userMessi = {
        "first_name": "Lionel",
        "last_name": "Cuccitini"
      }
      const response = await axios.patch(url, userMessi, { headers: { Authorization: `Bearer ${token}` } });
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
      const urlToken = "https://teal-monkey-hem.cyclic.app/api/users/login";
      const userMessiLogin = {
        "username": "messi",
        "password": "messi"
      }
      const responseToken = await axios.post(urlToken, userMessiLogin);
      const token = responseToken.data.token;

      const url = "https://teal-monkey-hem.cyclic.app/api/users/messi";
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
  });

