const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
   orderItems:[{
    //Array is used for multiplt Items
    type: mongoose.Schema.Types.ObjectId,
    ref:'OrderItems',
    required:true
   }]
})


const OrderModel = mongoose.model('Orders',orderSchema);
module.exports = OrderModel;