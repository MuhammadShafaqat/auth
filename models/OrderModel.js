const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
   orderItems:[{
    //Array is used for multiplt Items
    type: mongoose.Schema.Types.ObjectId,
    ref:'OrderItems',
    required:true
   }],
   shippingAddress1:{
      type: String,
      required: true
   },
   shippingAddress2:{
      type: String
   },
   city:{
      type: String,
      required:true
   },
   zip:{
      type: String,
      required: true
   },
   country:{
      type:String,
      required: true
   },
   phone:{
      type:String,
      required: true
   },
   status:{
      type: String,
      required: true,
      default: 'Pending'
   },
   totalPrice:{
      type: Number
   },
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
   },
   dateOrdered:{
      type: Date,
      default: Date.now,
   }
})


const OrderModel = mongoose.model('Orders',orderSchema);
module.exports = OrderModel;