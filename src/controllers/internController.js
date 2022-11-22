
const internModel= require('../models/InternModel')
const collegeModel=require('../models/collegeModel')
const {isValidMobile,isValidEmail,isValidString,isValidName,isIdValid}=require('../validators/validations')

/******************************** Create Intern *******************************/

const createIntern =async function (req,res){
    try{
        let data = req.body
        let {name,email,mobile,collegeId}=data
        if(Object.keys(data).length==0)   return res.status(400).send({status:false,message:"Request body cannot be empty"})
        
        if(!name)  return res.status(400).send({status:false,message:"name is required"})
        if(!isValidString(name) || !isValidName(name) ) return res.status(400).send({status:false,message:"Please provide valid name"})
        
        if(!email)  return res.status(400).send({status:false,message:"email is required"})
        if(!isValidEmail(email)) return res.status(400).send({status:false,message:"Please provide valid email"})
        const datas = await internModel.findOne({email:email})
        if(datas) return res.status(400).send({status:false,message:"Email is already present in Intern DB"})
        
        if(!mobile)  return res.status(400).send({status:false,message:"mobile number is required"})  
        if(!isValidMobile(mobile))  return res.status(400).send({status:false,message:"Please provide valid mobile number"})
        const data2= await internModel.findOne({mobile:mobile})
        if(data2)  return res.status(400).send({status:false,message:"mobile number is already present in Intern DB"})

        if(!collegeId) return res.status(400).send({status:false,message:"collegeId is required"})
        if(!isIdValid(collegeId)) return res.status(400).send({status:false,message:"Please provide valid collegeId"})
        const data1= await collegeModel.findOne({_id:collegeId})
        if(!data1)  return res.status(400).send({status:false,message:"CollegeId doesn't exist in college DB"})
 
        const savedData = await internModel.create(data)
        return res.status(201).send({status:true,data:savedData})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }  
}

module.exports.createIntern=createIntern
