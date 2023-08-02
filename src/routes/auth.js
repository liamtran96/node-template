const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', authMiddleware.refreshToken);

module.exports = router;
