const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')
const User = sequelize.models.users;
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authenticate = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

function generateAccessToken(user) {
    return jwt.sign({id_user:user.id_user},config.secret,{
        expiresIn: config.secretExp
    });
}
router.post('/login', async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({where:{email:email}});
        if(!user) return res.status(401).json({msg:'User does not exist'});
        if(!user.validPassword(password)) return res.status(401).json({msg:'Incorrect password'});
        const token = generateAccessToken(user);
        return res.status(200).json({token:token});
    }catch(e){
        return res.status(500).json({msg:'Internal server error'});
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
        return res.status(200).json({msg:"User created",data:newUser});
    }catch(e){
       return res.status(400).json({msg:"Error creating user"});
    }
})

router.get('/',[authenticate,authorization('user','admin')],async (req,res)=>{
    try{
        const users = await User.findAll({
            attributes: {exclude: ['password']},
        });
        return res.status(200).json({users:users});
    }catch(e){
       return res.status(500).json({msg:'Internal server error'});
    }
})

router.get('/:id',[authenticate,authorization('user','admin')], async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findOne({where:{id_user:id},attributes: {exclude: ['password']}});
        if(!user) return res.status(404).json({msg:'User not found'});
        return res.status(200).json(user);
    }catch(e){
        return res.status(500).json({msg:'Internal server error'});
    }
})

router.patch('/:id',[authenticate,authorization('user','admin')], async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    try{
        const user = await User.findOne({where:{id_user:id}});
        if(!user) return res.status(404).json({msg:'User not found'});
        await user.update(body);
        return res.status(200).json({msg:'User updated'});
    }catch(e){
        return res.status(500).json({msg:'Internal server error'});
    }
})

router.delete('/:id',[authenticate,authorization('user','admin')], async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findOne({where:{id_user:id}});
        if(!user) return res.status(404).json({msg:'User not found'});
        await user.destroy();
        return res.status(200).json({msg:'User deleted'});
    }catch(e){
        return res.status(500).json({msg:'Internal server error'});
    }
})

module.exports = router