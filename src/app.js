const express = require('express');
const uploadRoutes = require('./routes/upload');
const statusRoutes = require('./routes/status');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for processed images
app.use('/public', express.static('public'));

// API Routes
app.use('/api', uploadRoutes);
app.use('/api', statusRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;