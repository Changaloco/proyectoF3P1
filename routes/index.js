const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');

router.use('/users', require('./users'))
router.use('/directors',authenticate, require('./directors'))

module.exports = router