var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/categories', async function (req, res) {
    const categories = await prisma.tbl_cat.findMany({
        take: 50,
    })

    res.json({categories:categories})

});

router.get('/stickers', async function (req, res) {

    const stickers = await prisma.pack_stickers.findMany({

    })
    res.json({stickers:stickers})

});

router.get('/categoriesByLanguage', async function (req, res) {
    const language = parseInt(req.query.language)
    const categories = await prisma.tbl_cat.findMany({
        where: {
            language_app: language
        }
    })
    res.json({categories:categories})

});

router.get('/stickersByCategory', async function (req, res) {

    const category = parseInt(req.query.category)
    const stickers = await prisma.pack_stickers.findMany({
        where: {
            cid: category
        }
    })
    res.json({stickers:stickers})

});



router.get('/languages', async function (req, res) {

    const languages = await prisma.tbl_language.findMany({})
    res.json({languages: languages})

});

router.post('/incrementAdd', function (req, res) {

    const sticker = parseInt(req.query.id)
    const responce = prisma.pack_stickers.update({
        where:{
            identifier: sticker
        },
        data: {
            count_set_to_whatsapp: {
                increment: 1
            }
        }

    })
    res.json(responce)

});


router.post('/incrementViews',async function (req, res) {
    const sticker = parseInt(req.query.sticker)
    console.log(sticker);
    const responce =await prisma.pack_stickers.update({
        where: {
            identifier: sticker
        },
        data: {
            count_views: {
                increment: 1
            }
        }
    })

    res.json(responce)
});


module.exports = router;