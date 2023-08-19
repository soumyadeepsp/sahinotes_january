const authController = require("../controllers/auth_controller");
const express = require("express");
const router = express.Router();

router.get('/signup', authController.signuppage);
router.post('/signup', authController.signup);
router.get('/signin', authController.signinpage);
router.post('/signin', authController.signin);
router.get('/verify-mobile', authController.verifyMobile);
router.post("/mobile/sendotp", authController.sendOtp);
router.post("/mobile/verifyotp", authController.verifyOtp);
router.get("/logout", authController.logout);

module.exports = router;