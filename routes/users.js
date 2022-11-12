const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')
const User = sequelize.models.users;
const jwt = require('jsonwebtoken')
const {development, production} = require("../config/config");


function generateAccessToken(user) {
    return jwt.sign({id_user:user.id_user},'drsexo',{
        expiresIn: '8h'
    });
}
router.post('/login', async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({where:{email:email}});
        if(!user) return res.status(401).json({msg:'User does not exist'});
        if(!user.validPassword(password)) return res.status(401).json({msg:'Incorrect password'});
        const token = generateAccessToken(user);
        res.status(200).json({token:token});
    }catch(e){
        console.log(e)
        res.status(500).json({msg:'Internal server error'});
    }
})

router.post('/register', async (req, res) => {
    const {password,name,surname,type} = req.body;
    const email = req.body.email.toLowerCase();
    try{
        let user = await User.findOne({where:{email:email}});
        if(user) return res.status(400).json({msg:"User already exists"});
        const newUser = await User.create({email,password,name,surname,type});
        await newUser.save();
        delete newUser.dataValues.password;
        user = User.findOne({where:{email:email}});
        const token = generateAccessToken(user);
        newUser.setDataValue('token',token);
        res.status(200).json({msg:"User created",data:newUser});
    }catch(e){
        console.log(e);
       res.status(400).json({msg:"Error creating user"});
    }
})

router.get('/',async (req,res)=>{
    try{
        const users = await User.findAll({
            attributes: {exclude: ['password']},
        });
        res.status(200).json({users:users});
    }catch(e){
        res.status(500).json({msg:'Internal server error'});
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findOne({where:{id_user:id},attributes: {exclude: ['password']}});
        if(!user) return res.status(404).json({msg:'User not found'});
        res.status(200).json(user);
    }catch(e){
        res.status(500).json({msg:'Internal server error'});
    }
})

router.patch('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req.body;
    try{
        const user = await User.findOne({where:{id_user:id}});
        if(!user) return res.status(404).json({msg:'User not found'});
        await user.update(body);
        res.status(200).json({msg:'User updated'});
    }catch(e){
        res.status(500).json({msg:'Internal server error'});
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findOne({where:{id_user:id}});
        if(!user) return res.status(404).json({msg:'User not found'});
        await user.destroy();
        res.status(200).json({msg:'User deleted'});
    }catch(e){
        res.status(500).json({msg:'Internal server error'});
    }
})

module.exports = router