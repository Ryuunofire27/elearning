const router = require('express').Router();
const ur = require('../user/UserRoutes');
const { verifyToken } = require('../token');

router.use('/users', verifyToken, ur);

module.exports = router;
