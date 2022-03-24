const fs = require('fs');
const path = require('path');
const userController = require('../server/controller/controller.js');
// import { NextFunction, Request, Response } from 'express';
// import { request } from 'http';
const request = require('supertest');
const assert = require('assert');
const express = require('express');

const server = 'http://localhost:3000'

//TESTING CREATE USER
describe('testing create user', () => {


    

})

//we need to require/import supertest, otherwise cannot use 'request(server)'
//done


describe('POST /signup', function() {

    it('responds with json object and 400 status when duplicate user is entered', () => request(server)
        .post('/user/signup')
        .send({username: 'username1', password: 'password1', nickname: 'name1', email: 'email1', tos: 'string1'})
        .expect('Content-Type', /application\/json/)
        .expect(400)
    );

    it('responds with json object and 400 error when body is incorrect', () => request(server)
        .post('/user/signup')
        .send({password: 'test'})
        .expect('Content-Type', /application\/json/)
        .expect(400)
    );
});

describe('POST /login', function() {
    
    it('verifies database returns 200 status if user exists and password correct', () => request(server)
    .post('/user/login')
    .send({username: 'username', password: 'password'})
    .expect('Content-Type', /application\/json/)
    .expect(200)
    );

    it('does not login if incorrect password, returns status 400', () => request(server)
    .post('/user/login')
    .send({username: 'username', password: 'fakepassword'})
    .expect('Content-Type', /application\/json/)
    .expect(400)
    );

    it('does not login if no username, returns status 400', () => request(server)
    .post('/user/login')
    .send({password: 'fakepassword'})
    .expect('Content-Type', /application\/json/)
    .expect(400)
    );
})



