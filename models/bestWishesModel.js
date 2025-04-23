const mongoose=require("mongoose")

const bestWishesSchema=new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    image:{
        url:{
            type:String,
            require:true
        },
        public_id:{
            type:String,
            require:true
        }
    },
    message:{
        type:String,
    },
    club:{
        type:String,
        require:true
    }
},{timestamps:true})

const Wishes=mongoose.model("Wishes",bestWishesSchema)
module.exports=Wishes;