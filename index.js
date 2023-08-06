const express = require('express')
const port = 9000;
const app = express()
const cookieParser = require('cookie-parser')
const passport = require('passport')
const passportLocal = require('./config/passportLocal')
// express session-it is like a middleware
const session = require('express-session')
app.set("view engine", "ejs")
app.set('views', "./views")
// middlewares
app.use(express.json())//to parse the data
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(express.json())
// to set upe the cookie
app.use(session({
    name: 'random',
    secret: 'anything',
    saveUninitialized: false,//if the user is not logged in then also it tries to save the user data thats'why it is false
    resave: false,// baar data ko save na kare if login ho toh
    maxAge: 20 * 60 * 1000
}))

app.use(passport.initialize())// initialize the paasport for coming request and also it allows to use the authentication strategy
app.use(passport.session())



const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/signupDB", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("App is connected to DB")
}).catch((err) => {
    console.log(`${err}`)
})


const userRoute = require('./routes/index')
app.use('/public', userRoute)





app.listen(port, (err) => {
    if (err) {
        console.log(err);

    }
    else {
        console.log(`Server is listen on ${port}`)
    }
})