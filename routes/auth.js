const express = require('express');
const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');

const ensureAuth = require('../middlewares/autenticated');

const api=express.Router();

api.post('/register',AuthController.register);
api.post('/login',AuthController.login);
api.get('/me', ensureAuth.ensureAuth, UserController.getUser);

module.exports = api;