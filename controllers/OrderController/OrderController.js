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
        const order = await OrderModel.findById(req.params.id).populate('user','username');
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
        console.log(orderItemsResolvedIds)

        let order = await OrderModel.create({
            orderItems:orderItemsResolvedIds,
            shippingAddress1:req.body.shippingAddress1,
            shippingAddress2:req.body.shippingAddress2,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            status:req.body.status,
            totalPrice:req.body.totalPrice,
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



module.exports = {getOrder, getSingleOrder,createOrder}