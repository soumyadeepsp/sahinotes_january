const usersController = require("../controllers/users_controller");
const express = require('express');
const router = express.Router();

router.get('/home1', usersController.homeController);
router.get('/home2/coding', usersController.homeController2);
router.get('/', usersController.homeController2);

module.exports = router;