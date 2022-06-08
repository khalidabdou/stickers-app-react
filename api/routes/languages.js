var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//get languages
router.get('/', async function (req, res) {
    let languages = await prisma.tbl_language.findMany({})
    //onsole.log(languages);
    res.json(languages)

}
);


module.exports = router;