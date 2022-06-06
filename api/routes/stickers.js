var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET users listing. */
router.get('/', function(req, res, next) {
  //get all packs
  console.log("get all packs");
  let packs = prisma.pack_stickers.findMany({})
  
  res.json(packs)

});

module.exports = router;
