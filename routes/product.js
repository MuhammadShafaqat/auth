const express = require('express');
const {createProduct,getProduct, getSingleProduct} = require('../controllers/ProductController/ProductController');

const productRoutes = express.Router();

productRoutes.get('/products', getProduct)
productRoutes.get('/products/:id', getSingleProduct)
productRoutes.post('/products', createProduct)


module.exports = productRoutes