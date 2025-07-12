const express = require('express');
const router = express.Router();
const lesson1Controller = require('../controller/lesson1');
const { ObjectId } = require('mongodb');
const { getDb } = require('../services/mongo'); 

router.get('/', lesson1Controller.mariajoseRoute); // root route

router.get('/cote', lesson1Controller.coteRoute); // Optional extra route

//  GET one contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = getDb(); 
    const id = new ObjectId(req.params.id);
    const contact = await db.collection('contacts').findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
