require('dotenv').config();
const express = require('express');
const app = express();
const { connectToDatabase } = require('./services/mongo');

app.use(express.json()); // required for POST and PUT

// Connect to database
connectToDatabase();

// ✅ Import router correctly
const routes = require('./routes/index'); // Not just './routes'!

app.use('/contacts', routes); // Mount router

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Web Server is listening at http://localhost:${port}`);
});

const setupSwagger = require('./swagger');
setupSwagger(app);

app.get('/', (req, res) => {
  res.send('✅ Contacts API is running. Visit /contacts or /api-docs for Swagger docs.');
});
