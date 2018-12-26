exports.hasAuthorized = (req, res, next) => {
  try {
    if (req.jwtData) return next();
    throw new Error('No tiene autorización para realizar esta acción');
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
