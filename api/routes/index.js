var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/login', function (req, res) {

    const username = req.body.username
    const password = req.body.password
    console.log(req.body);
    if (username !== process.env.USERNAME) {
        console.log('user');
        return res.json('wrong username or password')
    }

    if (password !== process.env.PASSWORD) {
        console.log('pass');
        return res.json('wrong username or password')
    }
    
    res.json('success')
});

router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;
