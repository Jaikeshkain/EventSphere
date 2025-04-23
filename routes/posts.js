const express=require("express");
const Post = require("../models/PostModel");
const upload = require("../configs/multer");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router=express.Router();

//async handler
const asyncHandler=require("express-async-handler");

//add post api
router.get("/addposts",asyncHandler((req,res,next)=>{
    res.render("addPosts",{title:"Create Post",user:req.user,error:"",success:""})
}))

//add post logic api
router.post("/addposts",isAuthenticated,upload.array("images",5),asyncHandler(async (req,res,next)=>{
    if(!req.files || req.files.length===0 || !req.body.title){
        return res.render("addPosts",{
            title:"Add Post",
            user:req.user,
            error:"All fields are required or at least one image must be uploaded",
            success:""
        })
    }
        //images in array
        const images = req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }));
        const newPost = await Post.create({
          title: req.body.title,
          content: req.body.content,
          author: req.user._id,
          images: images,
          category: req.body.category,
          endDate: req.body.eventEndDate,
          club:req.body.club,
          registerlink:req.body.registerlink,
        });
    res.render("addPosts", {
      title: "Add Post",
      user: req.user,
      success: "Post Upload Successfully!",
      error:""
    });
}))

//fetch all posts
router.get("/",asyncHandler(async (req,res,next)=>{
  const posts=await Post.find().populate("author","username")
  res.render("posts", {
    title: "Posts",
    posts,
    user: req.user,
    success: "",
    error: "",
  });
}))

//fetch user's post by userid
router.get("/mine",asyncHandler(async (req,res,next)=>{
  const posts=await Post.find({author:req.user._id})
  res.render("userPosts",{
    title:"Post",
    posts,
    user:req.user,
    success:"",
    error:"",
  })
}))

//fetch post by id
router.get("/:id",asyncHandler(async (req,res,next)=>{
  const post=await Post.findById(req.params.id).populate("author","username")
  res.render("postDetails",{
    title:"Post",
    post,
    user:req.user,
    success:"",
    error:"",
  })
}))

//delete Post
router.post("/:id/delete",asyncHandler(async (req,res)=>{
  if(!req.params.id){
    throw new Error("Something Went Wrong")
  }
  await Post.findByIdAndDelete(req.params.id)
  res.redirect("/posts");
   
}));

//Edit Post
router.get("/:id/edit",asyncHandler(async (req,res)=>{
  if(!req.params.id){
    throw new Error("Something Went Wrong")
  }
  const post = await Post.findById(req.params.id)
  if(!post){
    throw new Error("Something Went wrong")
  }
  res.render("postEdit",{
    title:"Edit Post",
    user:req.user,
    success:"",
    post,
    error:""
  })
   
}));

//Edit Post Image Logic
router.post("/:id/editImage",upload.array("image",5),asyncHandler(async (req,res)=>{
  const updateImgPost=await Post.findByIdAndUpdate(req.params.id,{
    images:[{
      url:req.files[0].path,
      public_id:req.files[0].filename
    }]
  },{new:true})
  res.redirect(`/posts/${req.params.id}`)
}))

//Edit Post Logic
router.post("/:id/edit",asyncHandler(async (req,res)=>{
  const editedPost=await Post.findByIdAndUpdate(req.params.id,{
    title:req.body.title,
    content:req.body.content,
    author:req.user._id,
    club:req.body.club,
    category:req.body.category,
    endDate:req.body.endDate,
    registerlink:req.body.registerlink,
  },{new:true})
  if(!EditedPost){
    res.render("postEdit",{
      title:"Post Edit",
      user:req.user,
      success:"",
      error:"Could not Update the post"
    })
  }

  
  res.render("postEdit", {
    title: "Post Edit",
    user: req.user,
    success: "Post Updated Successfully",
    post:editedPost,
    error: "",
  });
}))



module.exports=router;