const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    id:Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

});

// userSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// userSchema.set('toJSON', {
//     virtuals: true,
// });

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel


// import mongoose, { Schema } from "mongoose";
// const mongoose = require("mongoose");

// const UserSchema = new Schema({
//   id: Schema.Types.ObjectId,
//   email: String,
//   password: String,
//   token: String,
// });

// export const UserModel = mongoose.model("Users", UserSchema);



// UserSchema.pre('save', ()=> {

// })

// UserSchema.methods.generateToken = () => {
  
// }
// hook PRE SAVE
// MODEL -> METHODS 