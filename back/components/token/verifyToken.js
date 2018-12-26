const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const secretKey = process.env.JWT_SECRET;
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);
      console.log(decoded)
      req.jwtData = decoded;
    }
    console.log('decoded')
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Autenticación fallida' });
  }
};
