const express = require('express');

const {createCategory,getCategories, getSingleCategory, deleteCategory, updateCategory, countCategories} = require('../controllers/CategoryController/CategoryController');

const categoryRoutes = express.Router();

categoryRoutes.get('/api/categories', getCategories);
categoryRoutes.get('/api/categories/count', countCategories); // Corrected
categoryRoutes.get('/api/categories/:id', getSingleCategory);
categoryRoutes.put('/api/categories/:id', updateCategory);
categoryRoutes.delete('/api/categories/:id', deleteCategory);
categoryRoutes.post('/api/categories', createCategory);



module.exports = categoryRoutes;

