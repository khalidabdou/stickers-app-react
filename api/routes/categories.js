var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const multer = require('multer');
const storage = multer.diskStorage({
    destination : function( req , file , cb ){  
        cb(null,'client/public/images');
    },
    filename: function( req , file , cb ){
        cb(null,new Date().toISOString() + file.originalname);
    }
})
const uploadImage = multer({storage : storage})



router.get('/', async function (req, res) {
    let catetories = await prisma.tbl_cat.findMany({})
    //console.log(catetories);
    res.json(catetories)

});

//add category post
router.post('/', async function (req, res) {
    
});

router.post("/upload", async (req, res) => {
    console.log("S");
    console.log(req.body);
    const param=req.body.data
   //prisma add category
    const cat= await prisma.tbl_cat.create({
        data:{ 
            name:param.name,
            image:param.fileName,
            language_app:1,
        }
    })
    console.log(cat)
    if (cat.id){
        res.json("success : id "  +cat.id);
    }else  res.json("success : id ");
    
    

});


//delete category
router.delete('/:id', async function (req, res) {
    
    let id =parseInt(req.params.id) ;

    
    let cat = await prisma.tbl_cat.delete({
        where: {
            id: id
        }
    });
    res.json(cat);
});




module.exports = router;