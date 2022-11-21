
const express=require('express')
const router=express.Router()
const collegeController= require('../controllers/collegeController')
const internController = require('../controllers/internController')

router.post('/functionup/colleges',collegeController.createCollege)
router.post('/functionup/interns',internController.createIntern)
router.get('/functionup/collegeDetails',collegeController.getCollegeData)

router.all("/*",function (){
    return res.status(404).send({status:false,message:"Page Not Found"})
})

module.exports=router