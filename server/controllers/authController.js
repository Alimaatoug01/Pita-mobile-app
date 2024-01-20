const {Users, Pets}=require('../database-Sequelize/index')
const {createUser} =require("./users.controllers")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id, fname) => {
    const expiresIn = 60 * 60 * 48;//2days
    return jwt.sign({ id, fname }, 'secretKey', { expiresIn: expiresIn });
  };

  const Register = async (req, res) => {
    const { fname,lname,  email, user_password  } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(user_password, 10);
  
      const newUser = {
        fname,
        lname,
        email,
        image:'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        user_password: hashedPassword}
       
        createUser({ body: newUser }, res);
    } catch (error) {
     
      res.status(500).json({ error: 'Error' });
    }
  };
  const Login = async(req, res) => {
    const{email,user_password}=req.body;
    try {
         const result= await Users.findOne({ where :{email:email},include: Pets })
         if(result ===null) res.send("email not found")
         else {
          const verif=result.dataValues.user_password
          const passwordMatch = await bcrypt.compare(user_password,verif)
          if(passwordMatch){

             const token=generateToken(result.dataValues.id,result.dataValues.user_fname)  
             result.dataValues.token=token
            res.send(result.dataValues)
          }
          else{
            res.send("password wrong")
          }
          
      }
    
    }
    catch (error) {res.status(500).json(error)}
}
module.exports = {Login , Register }