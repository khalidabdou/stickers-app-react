var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const webp = require('webp-converter');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
var url = require("url");
var path = require('path');
var https = require('https');
var sizeOf = require('image-size');
const sharp = require('sharp');
let animated = false



var index = 0;
var indexConvert = 0;
let stickersDir = [];
let stickersArray = []




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
  let animated = req.body.animated

  const tray = req.files.tray
  let success = 'success'
  let stickersString = ''
  let folderName = ''

  if (stickers) {
    stickers.forEach(async sticker => {
      stickersString += sticker.name + ','
    })
    try {
      folderName = Math.random().toString(36).substring(2, 7);
      await tray.mv(`./uploads/packs/${folderName}/tray.png`)
      //loop all files
      await stickers.forEach(async sticker => {
        await sticker.mv('./uploads/packs/' + folderName + '/' + sticker.name);
      });

    } catch (err) {
      console.log(err);
      success = 'error'
      return res.json(success);
    }


  } else {
    return res.json('no files uploaded');
  }



  if (animated === "1") {
    animated = true
  } else {
    animated = false
  }

  let responce = await prisma.pack_stickers.create({
    data: {
      cid: id,
      name: packName,
      stickers: stickersString,
      folder: folderName,
      animated_sticker_pack: animated
    }
  })
  console.log(responce);
  if (responce.identifier) {
    res.json('success added pack : id ' + responce.identifier);
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
    var dir = './uploads/packs/' + responce.folder;
    fs.rmSync(dir, { recursive: true, force: true });
    res.json('success delete id : ' + id)
  } else {
    res.json('failed to delete')
  }

});

//set enable pack
router.put('/:id', async function (req, res) {
  let id = parseInt(req.params.id);
  let enable = req.body.enable;

  console.log(req.body);
  console.log(enable);
  if (!id) {
    return res.json('no id or enable')
  }
  if (!enable) {
    return res.json('no enable')
  }

  if (enable === "true") {
    enable = true
  }
  else {
    enable = false
  }


  let responce = await prisma.pack_stickers.update({
    where: {
      identifier: id
    },
    data: {
      enabled: enable
    }
  });
  //console.log(responce);
  if (responce.identifier) {
    res.json(responce)
  } else {
    res.json('failed to enable')
  }

});


router.get('/sharp', async function (req, res) {
  const result = webp.gwebp("./uploads/packs/7vi7i/sticker_1.gif", "./uploads/packs/sticker_1.webp", "-q 80", logging = "-v");
  result.then((response) => {
    console.log(response);
  });


  // sharp('./uploads/packs/7vi7i/sticker_1.gif')
  //   .rotate()
  //   .resize(521, 521)
  //   .toFile('./uploads/packs/tray.webp', (err, info) => {
  //     console.log(err, info);
  //   })
  //   .toBuffer()
  //   .then(data => {
  //     return res.json('success')
  //   })
  //   .catch(err => {
  //     return res.json(err)
  //   });

})

router.put('/updateStickerItem/:id', async (req, res) => {

  console.log(req.params.id);

  const id = parseInt(req.params.id)
  const stickersUpdate= req.query.stickers
  console.log(stickersUpdate);
  const pack = await prisma.pack_stickers.update({
    where: {
      identifier: id
    },
    data:{
      stickers:stickersUpdate
    }
  })
  if (pack) {
    res.json(pack)
  }
  else res.json('error')

  

})

router.post('/scrap', (req, res) => {
  index = 0;
  indexConvert = 0;
  stickersDir = [];
  stickersArray = []
  let sticker_url = req.body.sticker_url
  let id = parseInt(req.body.categoryId)
  let packName = req.body.packName
  let animated = req.body.animated

  console.log(req.body);

  if (!sticker_url) {
    return res.json('error no url')
  }
  //check id
  if (!id) {
    return res.json('error no category')
  }
  //check packName
  if (!packName) {
    return res.json('error no packName')
  }

  //check animated
  if (!animated) {
    return res.json('error no animated')
  }

  let packProp = {
    cid: id,
    name: packName,
    animated_sticker_pack: animated,
    folderName: Math.random().toString(36).substring(2, 7)
  }



  webp.grant_permission();
  axios.get(sticker_url).then(({ data }) => {
    const $ = cheerio.load(data); // Initialize cheerio 
    //const links = extractLinks($);
    const content = stickers($);
    console.log(content);
    uploadToFloder(res, content, packProp)
  });
});


async function uploadToFloder(res, stickers, packProp) {
  const pack = packProp
  stickersDir = stickers
  var dir = './uploads/packs/' + packProp.folderName;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  uplaod(dir, index, res, pack)

}

const stickers = $ =>
  $('.sticker-pack-cols img')
    .map((_, stickers) => $(stickers).attr('src'))
    .toArray();

const image_tray = $ => $('.col-twelve img').attr('src')
const name = $ => $('.col-twelve h1').text()

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function uplaod(dir, isLast, res, packProp) {

  const dirPack = dir
  var parsed = url.parse(stickersDir[isLast]);
  element = stickersDir[index].split('?').slice(0, -1).join('?')
  const stick = path.basename(parsed.pathname)
  if (stick.includes('sticker')) {
    stickersArray.push(path.basename(parsed.pathname))
    console.log(element);
  }

  const file = await fs.createWriteStream(dir + '/' + path.basename(parsed.pathname));
  const request = await https.get(element, function (response) {
    response.pipe(file);
    // file catch error 
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");

      if (isLast === stickersDir.length - 1) {
        console.log('download done');
        if (stickersArray[0].includes('.png')) {
          packProp.animated = false
          convertAllToWebp(dir, 0, res, packProp)
        } else if (stickersArray[0].includes('.gif')) {
          packProp.animated = true
          convertAllGifToWebp(dir, 0, res, packProp)
        } else if (stickersArray[0].includes('.webp'))
          insertStickersData(res, packProp)
      } else {
        index++;
        uplaod(dirPack, index, res, packProp)
      }
    });
  });
}



async function insertStickersData(res, packProp) {
  console.log(packProp.animated);

  stickersArray.forEach(function (value, i) {

    stickersArray[i] = value.replace('.png', '.webp')
    stickersArray[i] = value.replace('.gif', '.webp')
  
  });


  const responce = await prisma.pack_stickers.create({
    data: {
      cid: packProp.cid,
      name: packProp.name,
      stickers: stickersArray.toString(),
      folder: packProp.folderName,
      animated_sticker_pack: packProp.animated
    }
  });



  //console.log(responce);
  if (responce.identifier) {
    res.json('success added pack : id ' + responce.identifier);
  } else {
    res.json('error added pack ');
  }
}


async function convertAllToWebp(dir, index, res, packProp) {

  console.log('convert png ' + index);
  console.log(stickersArray[index]);

  sharp(dir + '/' + stickersArray[index])
    .rotate()
    .resize(512, 512)
    .toFile(dir + '/' + stickersArray[index].replace('.png', '.webp'), (err, info) => {
      //console.log(err, info);
    })
    .toBuffer()
    .then(data => {
      if (index === stickersArray.length - 1) {
        console.log('all done convert');
        stickersArray[indexConvert] = stickersArray[indexConvert].replace('.png', '.webp')
        insertStickersData(res, packProp)
      } else {
        fs.unlink(dir + '/' + stickersArray[indexConvert], (err) => {
          if (err) {
            console.error(err)
          }
        })

        stickersArray[indexConvert] = stickersArray[indexConvert].replace('.png', '.webp')
        indexConvert++;
        convertAllToWebp(dir, indexConvert, res, packProp)
      }
    })
    .catch(err => {
      return res.json(err)
    });
}
convertAllGifToWebp = async (dir, index, res, packProp) => {
  console.log('convert gif to webp ' + index);
  packProp.animated = true
  const result = webp.gwebp(dir + '/' + stickersArray[index], dir + '/' + stickersArray[index].replace('.gif', '.webp'), "-q 20", logging = "-v");

  result.then((response) => {
    if (index === stickersArray.length - 1) {
      console.log('all done convert gif to webp');

      fs.unlink(dir + '/' + stickersArray[indexConvert], (err) => {
        if (err) {
          console.error(err)
        }
      })
      insertStickersData(res, packProp)
    } else {
      fs.unlink(dir + '/' + stickersArray[indexConvert], (err) => {
        if (err) {
          console.error(err)
        }
      })
      indexConvert++;
      convertAllGifToWebp(dir, indexConvert, res, packProp)
    }
  });

}


module.exports = router;
