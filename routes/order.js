const express =  require('express');
const { getOrder, getSingleOrder, createOrder } = require('../controllers/OrderController/OrderController');

const orderRoutes = express.Router();

orderRoutes.get('/orders', getOrder);
orderRoutes.post('/orders', createOrder)
orderRoutes.get('/orders/:id', getSingleOrder)


module.exports = orderRoutes