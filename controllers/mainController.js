module.exports.profile = (req, res) => {

    return res.send("This is my profile page")
}

module.exports.register = (req, res) => {
    return res.render("register")
}

module.exports.login = (req, res) => {
    return res.render('login')

}
