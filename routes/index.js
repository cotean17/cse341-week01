const routes = require('express').Router();
const lesson1Controller = require('../controller/lesson1');

routes.get('/', lesson1Controller.mariajoseRoute);
routes.get('/cote', lesson1Controller.coteRoute);

module.exports = routes; 

