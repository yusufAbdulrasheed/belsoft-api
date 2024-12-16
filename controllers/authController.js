const User = require('../model/userModel')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

// Registration Controller
const registerUser = async(req, res)=>{
  try{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status( 401).json({
        success:false,
        msg: 'Errors',
        errors: errors.array()
      })
    }

    const { name, email, password, role} = req.body

    // console.log(User)
    const isExistUser = await User.findOne({ email })
    if(isExistUser){
      return res.status(401).json({
        success: false,
        msg: "Email already exist"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 15)

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    })

    const userData = await user.save()

    return res.status(201).json({
      success: true,
      msg: "User Registered Successfully",
      data: userData
    })

  }
  catch(error){
      return res.status(400).json({
        success: false,
        msg: error.message
      })
  }
}


const generateAccessToken = async(user) => {
  // Sign the token with only necessary user details
  const token = jwt.sign(
    { user: { id: user._id, name: user.name, role: user.role } }, // Include only ID, name, and role
    process.env.ACCESS_SECRET_TOKEN, 
    { expiresIn: "1h" }
  );
  return token;
}


// Login Controller
const loginUser = async(req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({
        success: false,
        msg: 'Errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(401).json({
        success: false,
        msg: 'Incorrect Email & Password'
      });
    }

    const isPassword = await bcrypt.compare(password, userData.password);

    if (!isPassword) {
      return res.status(401).json({
        success: false,
        msg: 'Incorrect password'
      });
    }

    // Pass the userData to generate the token with user.id, user.name, and user.role
    const accessToken = await generateAccessToken(userData);

    return res.status(201).json({
      success: true,
      msg: 'Login Successfully',
      accessToken: accessToken,
      tokenType: "Bearer",
      data: userData
    });
  }
  catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message
    });
  }
}


//Logout Controller
let tokenBlacklist = [] 

const logoutUser = async (req, res) => {
  try {
    const token = req.body.token || req.query.token || req.headers["authorization"] 
    
    if (!token) {
      return res.status(403).json({
        success: false,
        msg: 'Token is required for logout',
      }) 
    }

    const bearer = token.split(' ') 
    const bearerToken = bearer[1] 

    // Add the token to blacklist
    tokenBlacklist.push(bearerToken) 

    return res.status(200).json({
      success: true,
      msg: 'User logged out successfully',
    }) 
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Logout failed',
    }) 
  }
} 

module.exports = {
  registerUser,
  loginUser,
  logoutUser
}