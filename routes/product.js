const express = require('express');
const {createProduct,getProduct, getSingleProduct, deleteProduct, countProducts, featureProducts,featuredLimit} = require('../controllers/ProductController/ProductController');

const productRoutes = express.Router();

productRoutes.get('/products', getProduct)
productRoutes.get('/products/count',countProducts)
productRoutes.get('/products/featured', featureProducts)
productRoutes.get(`/products/featured/:count`,featuredLimit)
productRoutes.get('/products/:id', getSingleProduct)
productRoutes.delete('/products/:id',deleteProduct)
productRoutes.post('/products', createProduct)


module.exports = productRoutes