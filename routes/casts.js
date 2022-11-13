const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const Cast = sequelize.models.casts;
const Movie = sequelize.models.movies;
const Actor = sequelize.models.actors;
const authorization = require("../middlewares/authorization");

router.get("/", authorization("user", "admin"), async (req, res) => {
  try {
    const casts = await Cast.findAll({
      include: [
        { model: Actor, attributes: ["name", "surname", "country"] },
        { model: Movie, attributes: ["title", "plot"] },
      ],
    });
    return res.status(200).json(casts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:id", authorization("user", "admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const cast = await Cast.findByPk(id, {
      include: [
        { model: Actor, attributes: ["name", "surname", "country"] },
        { model: Movie, attributes: ["title", "plot"] },
      ],
    });
    if (!cast) return res.status(404).json({ message: "Cast not found" });
    return res.status(200).json(cast);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", authorization("admin"), async (req, res) => {
  const { body } = req;
  try {
    const movie = await Movie.findByPk(body.fk_id_movie);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    const actor = await Actor.findByPk(body.fk_id_actor);
    if (!actor) return res.status(404).json({ message: "Actor not found" });
    const cast = await Cast.create(body);
    cast.save();
    return res.status(201).json(cast);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", authorization("admin"), async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const cast = await Cast.findByPk(id);
    if (!cast) return res.status(404).json({ message: "Cast not found" });
    if (body.fk_id_movie) {
      const movie = await Movie.findByPk(body.fk_id_movie);
      if (!movie) return res.status(404).json({ message: "Movie not found" });
    }
    if (body.fk_id_actor) {
      const actor = await Actor.findByPk(body.fk_id_actor);
      if (!actor) return res.status(404).json({ message: "Actor not found" });
    }
    cast.update(body);
    return res.status(200).json(cast);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authorization("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const cast = await Cast.findByPk(id);
    if (!cast) return res.status(404).json({ message: "Cast not found" });
    cast.destroy();
    return res.status(200).json(cast);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
