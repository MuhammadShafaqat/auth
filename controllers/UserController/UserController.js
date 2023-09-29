
const UserModel = require('../../models/UserModel');
// get all users List
const getUsers = async (req, res)=>{
    const userList = await UserModel.find().select('-password');

    if (!userList) {
        return res.status(501).send({success: false});
    }
    return res.status(200).send(userList)
}
// get a single user
const getSingleUser = async (req,res)=>{
    const user = await UserModel.findById(req.params.id).select('-password');
    if (!user) {
        return res.status(501).send({success: false});
    }
    return res.status(200).send(user);
}
// delete a user
const deleteUser = async (req,res)=>{
   try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
   return res.status(404).json({success: false, message: 'User not found'})
    }
    return res.status(200).json({success: true, message: 'User deleted successfully'})
   } catch (error) {
    console.error(error)
    return res.status(500).json({success: false, message: 'Server Error'})
   }
}
// Count the total number of users
  const countUsers = async (req, res) => {
    try {
      // Use Mongoose to count the documents in the "categories" collection
      const userCount = await UserModel.countDocuments();
  
      return res.status(200).json({ success: true, count: userCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }


module.exports ={ getUsers, getSingleUser, deleteUser, countUsers}