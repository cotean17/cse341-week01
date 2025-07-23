const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const { getDb } = require('../services/mongo');
const lesson1Controller = require('../controller/lesson1');

// ✅ GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Could not fetch contacts' });
  }
});

// ✅ GET one contact by ID
router.get('/:id', async (req, res) => {
  const idParam = req.params.id;

  // ✅ Check if ID is valid before converting
  if (!ObjectId.isValid(idParam)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const db = getDb();
    const id = new ObjectId(idParam);
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

// ✅ POST - Create a new contact
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // ✅ Validate input
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ error: 'Could not create contact' });
  }
});

// ✅ PUT - Update a contact by ID
router.put('/:id', async (req, res) => {
  const idParam = req.params.id;

  if (!ObjectId.isValid(idParam)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const db = getDb();
    const id = new ObjectId(idParam);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await db.collection('contacts').replaceOne(
      { _id: id },
      { firstName, lastName, email, favoriteColor, birthday }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ error: 'Could not update contact' });
  }
});

// ✅ DELETE - Delete a contact by ID
router.delete('/:id', async (req, res) => {
  const idParam = req.params.id;

  if (!ObjectId.isValid(idParam)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const db = getDb();
    const id = new ObjectId(idParam);
    const result = await db.collection('contacts').deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: 'Could not delete contact' });
  }
});

//
module.exports = router;

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 */
router.get('/', async (req, res) => {  });
