const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://liamtran:CF0yFoWdBvTopaE1@cluster0.eyypqxe.mongodb.net/'; // Replace this with your actual MongoDB connection string

export const databaseInit = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
