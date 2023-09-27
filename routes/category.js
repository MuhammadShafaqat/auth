const express = require('express');

const {createCategory,getCategories} = require('../controllers/CategoryController/CategoryController');

const categoryRoutes = express.Router();

categoryRoutes.get('/category', getCategories)
categoryRoutes.post('/category', createCategory);


module.exports = categoryRoutes;

