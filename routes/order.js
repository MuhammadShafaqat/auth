const express =  require('express');
const { getOrder, getSingleOrder } = require('../controllers/OrderController/OrderController');

const orderRoutes = express.Router();

orderRoutes.get('/orders', getOrder);
orderRoutes.get('/orders/:id', getSingleOrder)


module.exports = orderRoutes