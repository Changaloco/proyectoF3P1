const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')
const jwt = require('jsonwebtoken')


router.post('/login', async (req, res) => {
    const {name,surname,email,password,type} = req.body;
    try{
        const user = await sequelize.models.users.findOne({where:{email:email}});
        
    }catch(e){
        console.log(e)
    }
})

router.post('/register', async (req, res) => {

})

module.exports = router