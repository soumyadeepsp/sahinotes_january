const authController = require("../controllers/auth_controller");
const express = require("express");
const router = express.Router();

router.get('/signup', authController.signuppage);
router.post('/signup', authController.signup);
router.get('/signin', authController.signinpage);
router.post('/signin', authController.signin);

module.exports = router;