const usersController = require("../controllers/users_controller");
const express = require('express');
const router = express.Router();

router.get('/profile/:id', usersController.profilePage);
router.get('/sendemail', usersController.sendemail);
router.get("/forgot-password", usersController.forgotPassword);

module.exports = router;