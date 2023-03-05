const express = require ('express');
const router = express.Router();
const Category = require("../models/Category");

//Post Categories
router.post("/" , async(req,res)=>{
    const newCat =new Category(req.body);
    try{
        const savedCategory = await newCat.save();
        res.status(200).json(savedCategory);
    }
    catch(err){
        res.status(500).json(err);

    }
})

//Fetch All Categories Get API

router.get("/" , async(req,res)=>{
    
    try{
        const category = await Category.find();
        res.status(200).json(category);
    }
    catch(err){
        res.status(500).json(err);

    }
})

module.exports=router