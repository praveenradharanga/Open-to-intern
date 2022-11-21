const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

const interSchema = new mongoose.Schema({
     name: {type:String,required:true},
     email: {type:String,unique:true,required:true},
     mobile: {type:String,unique:true,required:true},
     collegeId: {type:ObjectId,ref:"College"},
     isDeleted: {type:Boolean, default: false}
},{timestamps:true})

module.exports= mongoose.model("Intern",interSchema)