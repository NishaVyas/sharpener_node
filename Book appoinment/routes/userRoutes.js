const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Insert user
router.post('/', UserController.insertUser);

// Get all users
router.get('/', UserController.getAllUsers);

// Delete user
router.delete('/:id', UserController.deleteUser);

module.exports = router;
