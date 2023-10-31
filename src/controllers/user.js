const User = require('../models/user');

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not get users.' });
    
  }
};
