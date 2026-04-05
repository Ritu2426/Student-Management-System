const jwt = require('jsonwebtoken');

const validateToken = async (token, tokenSecret) => {
  // returns user info, if the jwt token is valid
  return await jwt.verify(token, tokenSecret,
    (error, payload) => {
      if (error) {
      throw (error)
      }
      return payload
  })
}

module.exports = async function validateAccessToken (req, res, next) {
   
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
      req.user = await validateToken(token, process.env.ACCESS_TOKEN_SECRET);
      // If validation is successful, proceed to the next middleware
      next();
    }
    catch (error) {
      res.status(401).json({ error: error.message || 'Invalid access token' })
    }
}
