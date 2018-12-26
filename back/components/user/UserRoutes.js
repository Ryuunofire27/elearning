const ur = require('express').Router();
const uc = require('./UserController');
const um = require('./UserMiddlewares');
const auth = require('../token/index');

ur.get('/', uc.getUsers);
ur.get('/authenticate', auth.verifyToken, uc.authenticate)
ur.post('/', uc.createUser);
ur.post('/login', uc.login);
ur.get('/:id', uc.getUser);
ur.patch('/:id', auth.verifyToken, um.hasAuthorized, uc.updateUser);

module.exports = ur;
