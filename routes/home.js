const express = require("express");
const Post = require("../models/PostModel");
const asyncHandler=require("express-async-handler");
const Wishes = require("../models/bestWishesModel");
const router=express.Router()

router.get("/",asyncHandler(async (req,res)=>{
    const wishes=await Wishes.find()
    const posts=await Post.find().populate("author","username")
    const postCategory = {};
    posts?.forEach((post) => {
      if (!postCategory[post.category]) {
        postCategory[post.category] = [];
      }
      postCategory[post.category].push(post);
    });
    
    res.render("home", { title: "Home", user: req.user,error:"",posts,postCategory,wishes });
}))

module.exports=router