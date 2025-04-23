const mongoose=require("mongoose")

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Post"
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
},{timestamps:true});

const Comment=mongoose.model("File",commentSchema);

module.exports=Comment