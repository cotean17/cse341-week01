const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    db = client.db('cse341'); // uses DB name from connection string
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return db;
}

module.exports = { connectToDatabase, getDb };
