const express = require('express');
const router = express.Router();
const lesson1Controller = require('../controller/lesson1');

router.get('/', lesson1Controller.mariajoseRoute); // root path
router.get('/cote', lesson1Controller.coteRoute); // optional

module.exports = router;
