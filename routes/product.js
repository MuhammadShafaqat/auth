const express = require('express');
const {createProduct,getProduct, getSingleProduct, deleteProduct} = require('../controllers/ProductController/ProductController');

const productRoutes = express.Router();

productRoutes.get('/products', getProduct)
productRoutes.get('/products/:id', getSingleProduct)
productRoutes.delete('/products/:id',deleteProduct)
productRoutes.post('/products', createProduct)


module.exports = productRoutes