const { getDb } = require('../services/mongo');

const mariajoseRoute = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error getting contacts:', err);
    res.status(500).json({ error: 'Could not fetch contacts' });
  }
};


const coteRoute = async (req, res) => {
  res.status(200).json({ message: 'Hey! This is an optional route' });
};


module.exports = {
    mariajoseRoute,
    coteRoute,  
};