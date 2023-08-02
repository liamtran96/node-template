const express = require('express');
const router = express.Router();
const { getAllUser } = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.get('/getAll', authMiddleware.verifyAccessToken, getAllUser);

module.exports = router;
