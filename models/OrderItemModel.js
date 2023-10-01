const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new mongoose.Schema({
      quantity:{
        type:Number,
        required: true
      },
      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
      }
})


const OrderItemModel = mongoose.model('OrderItems',orderItemSchema);
module.exports = OrderItemModel;