
const collegeModel= require('../models/collegeModel')
const internModel=require('../models/InternModel')
const {isValidString,isValidName,isValidImage}=require('../validators/validations')

const createCollege =async function (req,res){

    try{
        let data=req.body
        let {name,fullName,logoLink}=data
        
        if(Object.keys(data).length==0)   return res.status(400).send({status:false,message:"Request body cannot be empty"})
        
        if(!name)  return res.status(400).send({status:false,message:"name is required"})
        if(!isValidString(name) || !isValidName(name) ) return res.status(400).send({status:false,message:"Please provide valid name"})
        const data1= await collegeModel.findOne({name:name})
        if(data1)  return res.status(400).send({status:false,message:"name is already present in Intern DB"})
       
        if(!fullName)  return res.status(400).send({status:false,message:"fullName is required"})
        if(!isValidString(fullName) || !isValidName(fullName) ) return res.status(400).send({status:false,message:"Please provide valid fullName"})
        
        if(!logoLink)  return res.status(400).send({status:false,message:"logoLink is required"})
        if(!isValidImage(logoLink))  return res.status(400).send({status:false,message:"Please provide valid logoLink"})

        const savedData = await collegeModel.create(data)
        return res.status(201).send({status:true,data:savedData})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }  
}

const getCollegeData =async function (req,res){

    try{
        let {collegeName}= req.query
        if(Object.keys(req.query).length==0) return res.status(400).send({status:false,message:"Please provide query param of collegeName"})
        
        const data1= await collegeModel.findOne({$or:[{name:collegeName},{fullName:collegeName}]},{isDeleted:false})
        if(!data1)  return res.status(404).send({status:false,message:"collegeName doesn't exist in DB"})
        let collegeId=data1._id

        const data = await internModel.find({collegeId:collegeId,isDeleted:false}).select({name:1,email:1,mobile:1})
        if(data.length==0)  return res.status(404).send({status:false,message:"No interns found for this College"})

        let obj={}
        obj.name=data1.name  
        obj.fullName=data1.fullName
        obj.logoLink=data1.logoLink
        obj.interns=data 
        
        return res.status(200).send({status:true,data:obj})

    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    } 
}

module.exports={createCollege,getCollegeData}
