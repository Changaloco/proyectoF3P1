const express = require('express')
const router = express.Router()


router.use('/users', require('./users'))
router.use('/directors', require('./directors'))

module.exports = router