const express=require("express");
const bcrypt=require("bcryptjs")
const User = require("../models/UserModel");
const passport=require("passport");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router=express.Router();

//async handler
const asyncHandler=require("express-async-handler");
const Post = require("../models/PostModel");
const upload = require("../configs/multer");
const Wishes = require("../models/bestWishesModel");


// Google OAuth Login Route
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Callback Route
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to homepage or dashboard
        res.redirect('/');  // Adjust to where you want to send users post-login
    }
);

//login api
router.get("/login",asyncHandler((req,res,next)=>{
    res.render("login",{error:"",title:"login",user:req.user})
}))

//login logic api
router.post("/login",asyncHandler(async (req,res,next)=>{
    
    passport.authenticate("local",(err,user,info)=>{
        if(err){
            return next(err)
        }
        if(!user){
            return res.render("login",{title:"Login",user:req.user,error:info.message})
        }
        req.logIn(user,(err)=>{
            if(err){
                return next(err)
            }
            return res.redirect("/")
        })
    })(req,res,next);
}))

//register api
router.get("/register",asyncHandler((req, res, next) => {
  res.render("login", { error: "", title: "Login", user: req.user });
}))

//register logic api
router.post("/register",asyncHandler(async (req, res) => {
    const {username,email,password}=req.body

    const checkUser=await User.findOne({email})
    if(checkUser){
        res.render("register",{status:true,error:"User already Exists"})
    }else{
        const hashedPassword=await bcrypt.hash(password,10)
        await User.create({
            username,
            email,
            password:hashedPassword
        })
        res.redirect("/auth/login")
    }
}))


router.get("/logout",asyncHandler((req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
        res.redirect("/auth/login")
    })
}))

//best Wishes
router.get("/addWishes",asyncHandler((req,res)=>{
    res.render("addWishes",{title:"Add Club Story",user:req.user,error:"",success:""})
}))

//best wishes logic
router.post("/addWishes",isAuthenticated,upload.single("image"),asyncHandler( async (req,res)=>{
    if(!req.user || !req.body?.club || !req.file){
        return res.render("addWishes",{
            title:"Add Club Wishes",
            user:req.user,
            error:"All fields are required",
            success:""
        })
    }
    await Wishes.create({
        username:req.user._id,
        club:req.body.club,
        image:{
            url:req.file.path,
            public_id:req.file.filename
        },
        message:req.body.message,
    })

    res.render("addWishes", {
      title: "Add Club Wishes",
      user: req.user,
      success: "Wish Upload Successfully!",
      error: "",
    });
}))

//fetch user by user id
router.get("/dashboard",isAuthenticated,asyncHandler(async (req,res)=>{
    const user=await User.findById(req.user._id)
    if(!user){
        res.redirect("/")
    }
    res.render("userDashboard", {
      title: " User Profile",
      user: user,
      success: "",
      error: "",
    });
}))

router.get("/profile",isAuthenticated,asyncHandler((req,res)=>{
    res.render("userProfile", {
      title: " User Profile",
      user: req.user,
      success: "",
      error: "",
    });
}))

module.exports=router;