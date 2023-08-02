const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { databaseInit } = require('./config/databaseInit');

databaseInit();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

function errorHandler(err, req, res, next) {
  console.log('Error', err.stack);
  logger.error(err.stack);
  res.status(err.status || 500).json({
    message: err.code,
    status: err.status || 500,
  });
}
app.use(errorHandler);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
