var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
    console.log('test');
    res.json('API is working properly 2');

});

module.exports = router;