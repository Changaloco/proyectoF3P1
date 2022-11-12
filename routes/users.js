const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')
const User = sequelize.models.users;
const jwt = require('jsonwebtoken')


router.post('/login', async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({where:{email:email}});
    }catch(e){
        console.log(e)
    }
})

router.post('/register', async (req, res) => {
    const {email,password,name,surname,type} = req.body;
    try{
        const user = await User.findOne({where:{email:email}});
        if(user) return res.status(400).json({msg:"User already exists"});
        const newUser = await User.create({email,password,name,surname,type});
        await newUser.save();
        res.status(200).json({msg:"User created",data:newUser});
    }catch(e){
       console.log(e);
       res.status(400).json({msg:"Error creating user"});
    }
})

module.exports = router