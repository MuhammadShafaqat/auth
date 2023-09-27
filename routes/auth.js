const express = require('express');
const  {registerUser, loginUser}  = require('../controllers/AuthController/AuthController.js');
const {getUsers, getSingleUser, deleteUser, countUsers} = require('../controllers/UserController/UserController.js')
const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/users', getUsers);
authRoutes.get('/users/:id', getSingleUser);
authRoutes.delete('/users/:id', deleteUser);
authRoutes.get(`/users/count`, countUsers);


module.exports = authRoutes ;


