const usersController = require("../controllers/users_controller");
const express = require('express');
const router = express.Router();

router.get('/profile', usersController.profilePage);

module.exports = router;