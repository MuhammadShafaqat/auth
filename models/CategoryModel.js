const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    id:Schema.Types.ObjectId,
    name:{
        type: String,
        required: true
    },
    icon:{
        type:String
    },
    color:{
        type:String
    }
})

const CategoryModel = mongoose.model('Categories', categorySchema);
module.exports = CategoryModel;