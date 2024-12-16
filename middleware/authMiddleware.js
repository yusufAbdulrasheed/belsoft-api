const jwt = require('jsonwebtoken')

const tokenBlacklist = []
const verifyToken = async (req, res, next) =>{
  const token = req.body.token || req.query.token || req.headers["authorization"]

  if(!token){
    return res.status(403).json({
      success : false,
      msg : 'A token is required for authentication'
    })
  } 

  try{
    const bearer = token.split(' ')
    const bearerToken = bearer[1]

    // Check if token is blacklisted
    if (tokenBlacklist.includes(bearerToken)) {
      return res.status(403).json({
        success: false,
        msg: 'Token has been invalidated. Please log in again.',
      }) 
    }

    const decodedData = jwt.verify(bearerToken, process.env.ACCESS_SECRET_TOKEN)
    req.user = decodedData.user
    console.log('Decoded User in the middleware:', req.user)
  }
  catch(error){
    return res.status(400).json({
      success: false,
      msg : 'Invalid Token'
    })
  }

  return next()
}

module.exports = verifyToken