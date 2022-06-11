var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/public/images');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const uploadImage = multer({ storage: storage })



router.get('/', async function (req, res) {
    let catetories = await prisma.tbl_cat.findMany({})
    //console.log(catetories);
    res.json(catetories)

});

//add category post
router.post('/', async function (req, res) {

});

router.post("/upload", async (req, res) => {
    let success=''
    let name = req.body.category
    console.log(req.body);

    if(!name){
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
            await image.mv('./uploads/' + image.name);  
            success = image.name
        }
    } catch (err) {
        return res.json('error');
    }

    const cat = await prisma.tbl_cat.create({
        data: {
            name: name,
            image: success,
            language_app: 1,
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