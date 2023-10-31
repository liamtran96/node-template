const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://blog:1ogG6si7Babyp34K@cluster0.eyypqxe.mongodb.net/?retryWrites=true&w=majority" // Replace this with your actual MongoDB connection string

export const databaseInit = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "blogs"
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
