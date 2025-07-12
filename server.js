require('dotenv').config();
const express = require('express');
const app = express();
const { connectToDatabase } = require('./services/mongo');

// Connect to MongoDB
connectToDatabase();

// Use routes from routes/index.js
const routes = require('./routes');
app.use('/', routes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Web Server is listening at http://localhost:${port}`);
});
