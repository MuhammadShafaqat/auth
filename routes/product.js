const express = require('express');
const {createProduct,getProduct} = require('../controllers/ProductController/ProductController');

const productRoutes = express.Router();

productRoutes.get('/products', getProduct)
productRoutes.post('/products', createProduct)


module.exports = productRoutes