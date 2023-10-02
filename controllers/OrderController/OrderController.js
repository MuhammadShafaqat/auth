const OrderModel = require('../../models/OrderModel');


const getOrder = async ()=>{
    try {
        const orderList = await OrderModel.find();
        if (!orderList) {
            return res.status(404).json({success:false,message:'There is no order found'})
        }
        return res.status(200).json(orderList)
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

// get request for single order
const getSingleOrder = async ()=>{
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) {
            return res.status(404).json({success:false,message:'No order found against this id'})
        }
        return res.status(200).json(order)
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message:'Internal server error'})
    }
}

module.exports = {getOrder, getSingleOrder}