const authController = require("../controllers/auth_controller");
const express = require("express");
const router = express.Router();

router.get('/signup', authController.signuppage);

module.exports = router;