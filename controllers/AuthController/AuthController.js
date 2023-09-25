const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel.js')


const registerUser = async (req, res)=>{
              const {username, password} = req.body;
              try {
                const existigUser = await UserModel.findOne({username});
                if(existigUser){
                    return res.status(404).send('User already exxists');
                }
                const hashedPassword = await bcrypt.hash(password,10);
                const newUser = await UserModel.create({username, password: hashedPassword});
                return res.status(201).send('User registered successfully');
              } catch (error) {
                console.error('Error creating user:' + error.message)
                return res.status(500).send('An Error occured')
              }
}
// module.exports = registerUser
// login user
const loginUser = async (req, res)=>{
     const {username, password} = req.body
     try {
      const user = await UserModel.findOne({username});
      if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) {
             const token = jwt.sign({username},'JWT_SECRET', {expiresIn:'1y'});
             user.token = token;
             await user.save();
             return res.status(201).send({message:'Login successful', token});
          }else{
         return res.status(401).send('Invalid Credentials')
          }
      }else{
        return res.status(401).send('Invalid Credentials')
      }
     } catch (error) {
      console.error('Error finding user: ' + error.message);
      return res.status(500).send('An error occurred');
     }
}

module.exports = {registerUser, loginUser}
