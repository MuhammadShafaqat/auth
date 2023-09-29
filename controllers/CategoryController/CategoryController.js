const CategoryModel = require('../../models/CategoryModel');

//get request 
const getCategories = async (req, res)=>{
    try {
        const category = await CategoryModel.find();
        if(!category){
         return res.status(404).json({success: false, message: 'category not found'})
        }
        return res.status(200).json(category)
    } catch (error) {
         console.error(error);
         return res.status(500).json({success: false, message: 'server error'})
    }
}
//get request for single category
const getSingleCategory = async (req,res)=>{
    try {
        const category = await CategoryModel.findById(req.params.id);

        if (!category) {
            return res.status(404).json({success:false, message:'category not found against this id'})
        }
        return res.status(201).json(category)
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: 'server error'})
    }
}
//put request 
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updatedData = req.body; // Assuming the request body contains the updated category data

        // Use Mongoose to find the category by ID and update it
        const category = await CategoryModel.findByIdAndUpdate(categoryId, updatedData, { new: true });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        return res.status(200).json({ success: true, message: 'Category successfully updated', updatedCategory: category });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// delete category
const deleteCategory = async (req,res)=>{
    try {
     const category = await CategoryModel.findByIdAndDelete(req.params.id);
     if (!category) {
    return res.status(404).json({success: false, message: 'category not found'})
     }
     return res.status(200).json({success: true, message: 'category deleted successfully'})
    } catch (error) {
     console.error(error)
     return res.status(500).json({success: false, message: 'Server Error'})
    }
 }

// post request
const createCategory = async (req, res)=>{
            try {
                const category = await CategoryModel.create(req.body);
                if(!category){
                // res.status(400).json({ error: 'Invalid request data' });
                 return res.status(400).json({success: false, message: 'category can not be created'})
                }
                return res.status(201).json(category)
            } catch (error) {
                 console.error(error);
                 return res.status(500).json({success: false, message: 'server error'})
            }
}
//count categories
const countCategories = async (req, res) => {
    try {
      // Use Mongoose to count the documents in the "categories" collection
      const categoryCount = await CategoryModel.countDocuments();
  
      return res.status(200).json({ success: true, count: categoryCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  


module.exports = {createCategory, getCategories, getSingleCategory,deleteCategory,updateCategory,countCategories}