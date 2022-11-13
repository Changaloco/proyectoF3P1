const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const Movie = sequelize.models.movies;
const Genre = sequelize.models.genres;
const Director = sequelize.models.directors;
const Cast = sequelize.models.casts;
const Actor = sequelize.models.actors;
const authorization = require("../middlewares/authorization");

router.get("/",authorization('user','admin'), async (req, res) => {
  try {
    const movies = await Movie.findAll();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:id",authorization('user','admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id,{
      include: [
        { model: Genre, attributes: ["name"] },
        { model: Director, attributes: ["name", "surname"] },
      ]
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    } else {
      return res.status(200).json(movie);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id/cast',authorization('user','admin'), async (req,res)=>{
  const {id} = req.params;
  try{
      const movie = await Movie.findByPk(id,{
        include: [
          { model: Cast,attributes:["fk_id_actor"],include:[
            { model: Actor, attributes: ["name", "surname","country"]},
          ] },
          
        ]
      });
      if(!movie) return res.status(404).json({message: 'Movie not found'});
      return res.status(200).json(movie);
  }catch(e){
    return res.status(500).json({message: e.message});
  }
})

router.post("/",authorization('admin'), async (req, res) => {
  const { body } = req;
  try {
    const genre = await Genre.findByPk(body.fk_id_genre);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    const director = await Director.findByPk(body.fk_id_director);
    if (!director) return res.status(404).json({ message: "Director not found" });
    const movie = await Movie.create(body);
    movie.save;
    return res.status(201).json(movie);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.patch("/:id",authorization('admin'),async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    if (body.fk_id_genre) {
      const genre = await Genre.findByPk(body.fk_id_genre);
      if (!genre) return res.status(404).json({ message: "Genre not found" });
    }
    if (body.fk_id_director) {
      const director = await Director.findByPk(body.fk_id_director);
      if (!director) return res.status(404).json({ message: "Director not found" });
    }
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    movie.update(body);
    return res.status(200).json({ message: "Movie updated", data: movie });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authorization('admin'),async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    movie.destroy();
    return res.status(200).json({ message: "Movie deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
