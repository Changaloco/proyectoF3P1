const { response } = require('express')
const jwt = require('jsonwebtoken')
const sequelize = require('../config/db')

const authenticate = async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).json({message:'Unauthorized'});
    try{
        jwt.verify(authorization, 'drsexo', async (err, decoded) => {
            if(err) return res.status(401).json({ message: 'Unauthorized!' })
            req.user = await sequelize.models.users.findOne({ where: { id_user: decoded.id_user } })
            next()
          })
    }catch(e){
        return res.status(401).json({message:'Unauthorized'});
    }
}

module.exports = authenticate;