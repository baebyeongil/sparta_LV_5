const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controllers');
const usersController = new UsersController();

router.post('/auth', usersController.authUsers);

router.post('/users', usersController.joinUsers);

module.exports = router;
