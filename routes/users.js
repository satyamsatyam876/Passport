const router = require('express').Router()
const bcrypt = require('bcryptjs')
const mainController = require('../controllers/mainController')
const passport = require('passport')
router.get('/profile', passport.checkAuthentication, mainController.profile)
router.get('/login', mainController.login)
router.get('/register', mainController.register)
//for register a user
//Register a user
router.post('/register', async (req, res) => {
    //validation of data--joi library

    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error)

    //checking if email exist
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("This Email Already Exist")
    //hash the password

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    // create a user
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword

    })
    // save to db

    try {
        const userData = await newUser.save()
        res.status(201).render('login')

    }
    catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router