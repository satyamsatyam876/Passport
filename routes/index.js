const router = require('express').Router()
const homeController = require('../controllers/homeController')
router.get('/home', homeController.home)

router.use('/user', require('./users'))














module.exports = router