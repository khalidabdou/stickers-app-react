var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/',async function(req, res) {
    let categories = await  prisma.tbl_cat.findMany({})
    res.json(categories)

});

//add category post
router.post('/',async function(req, res) {
   console.log(req.query.cat.image);
   console.log("post ok");
});



module.exports = router;