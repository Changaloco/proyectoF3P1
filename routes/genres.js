const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const Genre = sequelize.models.genres;
const Movie = sequelize.models.movies;
const authorization = require("../middlewares/authorization");


router.get("/",authorization('user','admin'), async (req, res) => {
    try{
        const genres = await Genre.findAll();
        return res.status(200).json(genres);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
});

router.get("/:id",authorization('user','admin'), async (req, res) => {
    const {id} = req.params;
    try{
        const genre = await Genre.findByPk(id);
        if(!genre) return res.status(404).json({message: "Genre not found"});
        return res.status(200).json(genre);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
});

router.get('/:id/movies',authorization('user','admin'), async(req, res) => {
    const {id} = req.params;
    try{
        const genre = await Genre.findByPk(id,{
            include: [
                { model: Movie, attributes: ["id_movie","title", "date"] },
            ]
        });
        if(!genre) return res.status(404).json({message: 'Genre not found'});
        return res.status(201).json(genre);
    }catch(e){
        return res.status(500).json({message: e.message});
    }
});

router.post("/",authorization('admin'), async (req, res) => {
    const {body} = req;
    try{
        const genre = await Genre.create(body);
        genre.save();
        return res.status(201).json(genre);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
});

router.patch("/:id",authorization('admin'), async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    try{
        const genre = await Genre.findByPk(id);
        if(!genre) return res.status(404).json({message: "Genre not found"});
        genre.update(body);
        return res.status(200).json({message: "Genre successfully updated",data: genre});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
});

router.delete("/:id",authorization('admin'), async (req, res) => {
    const {id} = req.params;
    try{
        const genre = await Genre.findByPk(id);
        if(!genre) return res.status(404).json({message: "Genre not found"});
        genre.destroy();
        return res.status(200).json({message: "Genre successfully deleted"});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
});

module.exports = router;