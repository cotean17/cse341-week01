const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');

router.get('/', usersController.getAll); // Get all users

router.get('/:id', usersController.Single); // Get user by ID

router.post('/', usersController.createUser); // Create a new user

router.put('/:id', usersController.updateUser); // Update user by ID

router.delete('/:id', usersController.deleteUser); // Delete user by ID

module.exports = router;