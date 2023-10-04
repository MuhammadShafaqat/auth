const OrderModel = require('../../models/OrderModel');
const OrderItemModel = require('../../models/OrderItemModel')


const getOrder = async (req,res)=>{
    try {
        // const orderList = await OrderModel.find();
        // const orderList = await OrderModel.find().populate('user');
        // const orderList = await OrderModel.find().populate('user','username');
        const orderList = await OrderModel.find().populate('user','username').sort({'dateOrdered': -1});
        if (!orderList) {
            return res.status(404).json({success:false,message:'There is no order found'})
        }
        return res.status(200).json(orderList)
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
};
// get a single order
// get request for single order
const getSingleOrder = async (req,res)=>{
    try {
        // const order = await OrderModel.findById(req.params.id)
        // .populate('user','username')
        // .populate('orderItems');
        //2-In case of populating the product items from an array we use (path, populate)
        // const order = await OrderModel.findById(req.params.id)
        // .populate('user','username')
        // .populate({path: 'orderItems', populate: 'product'});
        //3- Next we are going to populate the category which is inside the product 
        const order = await OrderModel.findById(req.params.id)
        .populate('user','username')
        .populate({
            path: 'orderItems', populate: {
                path: 'product',populate: 'category'}
            });
        if (!order) {
            return res.status(404).json({success:false,message:'No order found against this id'})
        }
        return res.status(200).json(order)
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}
//create an order
const createOrder = async (req,res)=>{
    try {

        const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem)=>{
             let newOrderItem = await OrderItemModel.create({
                quantity:orderItem.quantity,
                product:orderItem.product
             })        
             return newOrderItem.id     
        }))
        const orderItemsResolvedIds = await orderItemsIds
       // In order to avoid the someone fakes change the order items values, we fix them at backnd 
       const totalPrices = await Promise.all(orderItemsResolvedIds.map(async orderItemId =>{
                  const orderItem = await OrderItemModel.findById(orderItemId).populate('product','price');
                  const totalPrice = orderItem.product.price*orderItem.quantity;
                  return totalPrice
       }))
console.log(totalPrices)
      const totalPrice = totalPrices.reduce((a,b)=>a+b,0)
        let order = await OrderModel.create({
            orderItems:orderItemsResolvedIds,
            shippingAddress1:req.body.shippingAddress1,
            shippingAddress2:req.body.shippingAddress2,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            status:req.body.status,
            // totalPrice:req.body.totalPrice,
            totalPrice:totalPrice,
            user:req.body.user
        });
        if (!order) {
            return res.status(400).json({success:false, message:'order can not be created'});
        }
        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:'Internal server error'}) 
    }
}
// update request, in order case usually the admin wants just to update the order status
const updateOrderStatus = async (req,res)=>{
                    try {
                        const order = await OrderModel.findByIdAndUpdate(
                            req.params.id,{
                        status:req.body.status
                        }, {new: true})
                        if (!order) {
                            return res.status(400).json({success:false, message: 'order do not exist against this id'})
                        }
                        return res.status(200).send(order)
                    } catch (error) {
                        return res.status(500).json({success:false, message: 'Internal server errorss'})  
                    }
}
// delete category
//By below code we can only delete the orders not the orderItems
// const deleteOrder = async (req,res)=>{
//     try {
//      const order = await OrderModel.findByIdAndDelete(req.params.id);
//      if (!order) {
//     return res.status(404).json({success: false, message: 'Order not found'})
//      }
//      return res.status(200).json({success: true, message: 'Order deleted successfully'})
//     } catch (error) {
//      console.error(error)
//      return res.status(500).json({success: false, message: 'Server Error'})
//     }
//  }
// Here is the solution to delete the order as well as orderItems 
const deleteOrder = async (req,res)=>{
    try {
     const order = await OrderModel.findByIdAndRemove(req.params.id).then(async order=>{
        if (!order) {
             res.status(404).json({success: false, message: 'Order not found'})
             return
             }
        if (order) {
            await order.orderItems.map(async orderItem =>{
              await OrderItemModel.findByIdAndRemove(orderItem);
            //   if(!orderItem){
            //     return   res.status(404).json({success: false, message: 'OrderItem not found'})
                  
            //   }
            //   return res.status(200).json({success: false, message: 'OrderItems are also successfully deleted'})
            })
        }
     });
    
     return res.status(200).json({success: true, message: 'Order deleted successfully'})
    } catch (error) {
     console.error(error)
     return res.status(500).json({success: false, message: 'Server Error'})
    }
 }
// In order to get total orders sales 
const totalSales = async (req,res)=>{
       const totalSales = await OrderModel.aggregate([
        {$group: {_id: null, totalsales: {$sum: '$totalPrice'}}}
       ])
    if (!totalSales) {
        return res.status(400).json({success:false, message:'The order sale can not be generated'})
    }
    return res.status(200).send({totalsales: totalSales.pop().totalsales})
}




module.exports = {getOrder, getSingleOrder,createOrder,updateOrderStatus,deleteOrder,totalSales}