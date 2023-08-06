const passport = require('passport')
//tell the passport to use local strategy
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')


// passport will use local strategy


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                console.log('There is an error in searching the user in db');
                done(err)
            }
            if (user.password !== req.body.password) {
                console.log(`Failed`)
                return done(null, false)
            }
            return done(null, true)

        })

    }


))

// serializer-- you have to decide what you want to kept in a cookie
passport.serializeUser((user, done) => {
    return done(null, user.id)
})
//deserializer--to check the id or user in the databse by looking at the cookie
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log(`There is an error in finding the user in db`)
            return done(err)
        }
        return done(null, user)


    })
})
// to check if user is authenticated or not
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('back')

}

module.exports = passport

