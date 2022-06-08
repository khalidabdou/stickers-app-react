var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var fs = require('fs');

/* GET users listing. */
router.get('/', async (req, res,) => {
  //get all packs
  console.log("get all packs");
  let packs = await prisma.pack_stickers.findMany({})
  //console.log(packs);
  res.json(packs)

});

//add pack
router.post('/', async function (req, res) {
  

  const id = parseInt(req.body.categoryId)
  const packName = req.body.packName
  const stickers = req.files.file
  let success = 'success'
  let stickersString=''
  let data = [];
  let folderName = ''
  

  
  if (stickers) {

    try {
      const folderName = Math.random().toString(36).substring(2,7);
        //loop all files
       await stickers.forEach(async sticker => {  

        
          await sticker.mv('./uploads/'+folder+'/' + sticker.name);

          //push file details
          stickersString += sticker.name + ','
          data.push({
            name: sticker.name,
            mimetype: sticker.mimetype,
            size: sticker.size
          });
        });

  
      
      
    } catch (err) {
      console.log(err);
      success = 'error'
      return res.json(success);
    }


  }else {
   return res.json('no files uploaded');
  }

  let responce = await prisma.pack_stickers.create({
    data: {
      cid: id,
      name: packName,
      stickers: stickersString,
      folder: folderName,
    }
  })
  if (responce.identifier) {
    res.json('success added pack : id ' + responce.identifier );
  } else {
    res.json('failed added pack ');
  }
});

//delete pack
router.delete('/:id', async function (req, res) {
  let id = parseInt(req.params.id);
  let responce = await prisma.pack_stickers.delete({
    where: {
      identifier: id
    }
  });
  console.log(responce);
  if (responce.identifier) {
    res.json('success delete id : ' + id )
  } else {
    res.json('failed to delete')
  }

});

module.exports = router;
