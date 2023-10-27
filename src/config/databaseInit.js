const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://blog:q9AvMzPKoC3tbUAg@cluster0.eyypqxe.mongodb.net/?retryWrites=true&w=majority" // Replace this with your actual MongoDB connection string

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
