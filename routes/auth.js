const express = require('express');
const  {registerUser, loginUser}  = require('../controllers/AuthController/AuthController.js');

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser)

module.exports = authRoutes ;


// const express = require('express')
// const {registerUser} = require('../controllers/AuthController/AuthController.js');

// export const authRoutes = express
// .Router()
// .post('/register', registerUser)