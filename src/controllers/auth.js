const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokens');
import { logger } from '../logger';

async function register(req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists.')
    }

    const hashedPassword =await  bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
   const {
    _id
   } = await user.save();

    res.status(201).json({ message: 'User registered successfully.', _id });
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ error: 'Could not register user.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials.')
      // return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials.')
      // return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ error: 'Could not log in.' });
  }
}

module.exports = { register, login };
