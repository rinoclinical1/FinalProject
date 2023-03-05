const express = require ('express');
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcrypt');
const { genSalt } = require('bcrypt');

// EDIT USER 
router.put('/:id',async(req,res)=>{
    
    if(req.body.userId===req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true});
            res.status(200).json(updatedUser);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You can only update your own account");
    }
});



//DELETE USER

router.delete('/:id',async(req,res)=>{
    
    if(req.body.userId===req.params.id){
        try{
            const user = await User.findById(req.params.id);
       
         try{
             await Post.deleteMany({username:user.username})
             await User.findByIdAndRemove(req.params.id);
             
            res.status(200).json('user deleted');
            }
            catch(err){
                res.status(500).json(err);

            }
        }
        catch(err){
            res.status(404).json("User not Found");
        }
    }
    else{
        res.status(401).json("You can only delete your own account");
    }
});


//GET
router.get('/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const{password, ...others}=user._doc;
        res.status(200).json(others)
    }
    catch(err){
        res.status(500).json(err);
    }

})


module.exports=router