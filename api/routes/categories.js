var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()




router.get('/all', async function (req, res) {
    //get params

    let language = parseInt(req.query.language);

    if (language != 1) {
        language = { language_app: language }
    } else {
        language = {}
    }
    console.log(language);
    let catetories = await prisma.tbl_cat.findMany({
        where: language,
        include: {
            _count: {
                select: {
                    pack_stickers: true,
                }
            }

        }

    })
  
    res.json(catetories)
})


router.post("/upload", async (req, res) => {
    let success = ''
    let name = req.body.category
    let language = parseInt(req.body.language)


    if (!name) {
        success = "Please enter category name"
        return res.json(success)
    }
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let image = req.files.file;
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            await image.mv('./uploads/categories/' + image.name);
            success = image.name
        }
    } catch (err) {
        return res.json('error');
    }

    const cat = await prisma.tbl_cat.create({
        data: {
            name: name,
            image: success,
            language_app: language,
        }
    })
    console.log(cat)
    if (cat.id) {
        res.json("success : id " + cat.id);
    } else res.json("success : id ");



});


//delete category
router.delete('/:id', async function (req, res) {
    let id = parseInt(req.params.id);
    let cat = await prisma.tbl_cat.delete({
        where: {
            id: id
        }
    });

    if (cat.id) {
        res.json("success delete catrgory id : " + id)
    } else {
        res.json("failed to delete this category");
    }

});




module.exports = router;