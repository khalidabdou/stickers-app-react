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

var index = 0;
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

  console.log(animated);

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

router.post('/scrap', (req, res) => {
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
  const pack=packProp
  stickersDir = stickers
  var dir = './uploads/packs/' + packProp.folderName;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  
  //upload stickers from url
  // await stickers.forEach(async element => {
  //   var parsed = url.parse(element);
  //   element = element.split('?').slice(0, -1).join('?')
  //   const file = await fs.createWriteStream(dir + '/' + path.basename(parsed.pathname));
  //   const request = await https.get(element, function (response) {
  //     response.pipe(file);
  //     file.on("finish", () => {
  //       file.close();
  //       console.log("Download Completed");
  //     });
  //   });
  // });

  //upload stickers from url
  uplaod(dir, index,res,pack)
  //return res.json('success')
  //upload tray image from url
  //var parsed_tray_image = url.parse(tray_image_file);
  // const file = fs.createWriteStream(dir + '/tray.png');
  // const request = await https.get(tray_image_file, function (response) {
  //   response.pipe(file);
  //   file.on("finish", () => {
  //     file.close();
  //     console.log("Download Completed");
  //   });
  // });
  //console.log(file);


  //await sleep(5000);

  //convert all png to webp
  // if (fs.existsSync(dir)) {
  //   var stickersArray = []
  //   stickers.forEach(async element => {
  //     element = element.split('?').slice(0, -1).join('?')
  //     var parsed = url.parse(element);
  //     if (parsed.pathname.endsWith('.webp')) {
  //       var stick = path.basename(parsed.pathname)
  //       stickersArray.push(stick)
  //       return
  //     }
  //     var stick = path.basename(parsed.pathname).replace(".png", ".webp")
  //     //stick = stick.replace(".gif", ".webp")

  //     var dimensions = sizeOf(dir + '/' + path.basename(parsed.pathname));
  //     let isSticker = stick.startsWith("sticker")
  //     if (dimensions.width == 512 && dimensions.height == 512 && isSticker) {
  //       const result = webp.cwebp(
  //         dir + '/' + path.basename(parsed.pathname),
  //         dir + '/' + stick,
  //         "-q 80",
  //         logging = "-v");
  //       stickersArray.push(stick)
  //       result.then((response) => {
  //         //   fs.unlink(dir + '/' + path.basename(parsed.pathname), function (err) {
  //         //     if (err) throw err;
  //         //     // if no error, file has been deleted successfully
  //         //     console.log('File deleted!');
  //         // });
  //       });
  //     }
  //   })
  // }

  // const responce = await prisma.pack_stickers.create({
  //   data: {
  //     cid: packProp.cid,
  //     name: packProp.name,
  //     stickers: stickersArray.toString(),
  //     folder: packProp.folderName,
  //     animated_sticker_pack: true
  //   }
  // })

  // //console.log(responce);
  // if (responce.identifier) {
  //   res.json('success added pack : id ' + responce.identifier);
  // } else {
  //   res.json('failed added pack ');
  // }

  //insert in database
  //insertStickersData(res, name, false, stickersArray, folderNameGererated)

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

async function uplaod(dir, isLast,res,packProp) {
  
  const dirPack = dir
  var parsed = url.parse(stickersDir[isLast]);
  element = stickersDir[index].split('?').slice(0, -1).join('?')
  stickersArray.push(path.basename(parsed.pathname))
  const file = await fs.createWriteStream(dir + '/' + path.basename(parsed.pathname));
  const request = await https.get(element, function (response) {
    response.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
      if (isLast === stickersDir.length - 1) {
        console.log('all done');
        insertStickersData(res,packProp)
      } else {
        index++;
        uplaod(dirPack, index,res,packProp)
      }
    });
  });
}

async function insertStickersData(res,packProp){
  console.log(packProp);
  const responce = await prisma.pack_stickers.create({
    data: {
      cid: packProp.cid,
      name: packProp.name,
      stickers: stickersArray.toString(),
      folder: packProp.folderName,
      animated_sticker_pack: true
    }
  })

  //console.log(responce);
  if (responce.identifier) {
    res.json('success added pack : id ' + responce.identifier);
  } else {
    res.json('failed added pack ');
  }
}



module.exports = router;
