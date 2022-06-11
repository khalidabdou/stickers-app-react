const express = require('express');
const login = express.Router();
const passport = require("passport");
const { loginSchema } = require('../../app/validation/validation')

login.get('/', (req, res) => {
    res.render('index');
});

login.post('/', (req, res, next) => {
    const result = loginSchema.validate(req.body);
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        res.render('index', { error_msg: "Username and password required :( " });
    } else {
        passport.authenticate("local_login", {
            successRedirect: '/dashboard', // redirect to the secure profile section
            failureRedirect: '/dashboard', // redirect back to the signup page if there is an error
            failureFlash: false, // allow flash messages
            failWithError: '/',
        })(req, res, next);
    }
});

login.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

login.get('/reg', (req, res) => {
    res.redirect('/')
});

module.exports = login;
