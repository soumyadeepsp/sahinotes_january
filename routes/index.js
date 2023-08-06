const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/notes', require('./notes'));
router.use('/auth', require('./auth'));

module.exports = router;