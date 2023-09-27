const CategoryModel = require('../../models/CategoryModel');

//get request 
const getCategories = async (req, res)=>{
    try {
        const category = await CategoryModel.find();
        if(!category){
         return res.status(400).json({success: false, message: 'category can not be created'})
        }
        return res.status(201).json(category)
    } catch (error) {
         console.error(error);
         return res.status(500).json({success: false, message: 'server error'})
    }
}

// post request
const createCategory = async (req, res)=>{
            try {
                const category = await CategoryModel.create(req.body);
                if(!category){
                 return res.status(400).json({success: false, message: 'category can not be created'})
                }
                return res.status(201).json(category)
            } catch (error) {
                 console.error(error);
                 return res.status(500).json({success: false, message: 'server error'})
            }
}

module.exports = {createCategory, getCategories}