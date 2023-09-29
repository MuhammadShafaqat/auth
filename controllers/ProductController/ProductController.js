const CategoryModel = require('../../models/CategoryModel');
const ProductModel = require('../../models/ProductModel');

const getProduct = async (req,res)=>{
      try {
            // const productList = await ProductModel.find();
            const productList = await ProductModel.find().populate('category');
            if (!productList) {
                return res.status(404).json({success: false, message: 'product not found'})
            }
        return res.status(200).json(productList)
      } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: 'Internal server error'})
      }
}

// post request for product
const createProduct = async (req,res)=>{
        try {
            const category = await CategoryModel.findById(req.body.category);
            if(!category) return res.status(400).json({success:false, message:'Invalid category'})

            const product = await ProductModel.create(req.body);
            if(!product){
                // res.status(400).json({ error: 'Invalid request data' });
            return  res.status(400).json({success: false, message: 'Product can not be created'})
            }
            return res.status(201).json({success: true, message:'Product created successfully'})
            // return res.status(201).send(Product)
        } catch (error) {
            console.error(error);
            return res.status(500).json({success: false, message:'Internal server error'})

        }
}

module.exports = {createProduct,getProduct}