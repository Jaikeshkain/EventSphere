const cloudinary=require("cloudinary").v2
const multer=require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
  api_key: "726985932697591",
  api_secret: "5i_WYfjhOHRh1WHoFTKsJrZLEC4",
  cloud_name: "dvnsa4gmh",
});

//configure multer storage cloudinary
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"fullstack-blog-project",   //folder that displays in our dashboard
        format:async (req,file)=>"png",  //specific format image
        public_id:(req,file)=>file.fieldname+"_"+Date.now(),  //filename to dlete
    }
})

//configure multer
const upload=multer({
    storage:storage,
    limits:1024*1024*5,
    fileFilter:function(req,file,callbck){
        if(file.mimetype.startsWith("image/")){
            callbck(null,true)
        }else{
            callbck(new Error("Not an image! Please Upload an image",false));
        }
    }
})

module.exports=upload