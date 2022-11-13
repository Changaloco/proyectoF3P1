const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const Actor = sequelize.models.actors;
const Cast = sequelize.models.casts;
const Movie = sequelize.models.movies;
const authorization = require("../middlewares/authorization");

router.get("/", authorization("user", "admin"), async (req, res) => {
  try {
    const actors = await Actor.findAll();
    return res.status(200).json(actors);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:id", authorization("user", "admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const actor = await Actor.findByPk(id);
    if (!actor) return res.status(404).json({ message: "Actor not found" });
    return res.status(200).json(actor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/:id/movies", authorization("user", "admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const actor = await Actor.findByPk(id, {
      include: [
        {
          model: Cast,
          attributes: ["fk_id_movie"],
          include: [
            { model: Movie, attributes: ["id_movie", "title", "date"] },
          ],
        },
      ],
    });
    if (!actor) return res.status(404).json({ message: "Actor not found" });
    return res.status(201).json(actor);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post("/", authorization("admin"), async (req, res) => {
  const { body } = req;
  try {
    const actor = await Actor.create(body);
    actor.save();
    return res.status(201).json(actor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", authorization("admin"), async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const actor = await Actor.findByPk(id);
    if (!actor) return res.status(404).json({ message: "Actor not found" });
    actor.update(body);
    return res.status(200).json(actor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authorization("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const actor = await Actor.findByPk(id);
    if (!actor) return res.status(404).json({ message: "Actor not found" });
    actor.destroy();
    return res.status(200).json(actor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
