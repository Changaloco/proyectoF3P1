const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const Director = sequelize.models.directors;
const Movie = sequelize.models.movies;
const authorization = require("../middlewares/authorization");

router.get("/", authorization("user", "admin"), async (req, res) => {
  try {
    const directors = await Director.findAll();
    return res.status(200).json(directors);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get("/:id", authorization("user", "admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const director = await Director.findByPk(id);
    if (!director)
      return res.status(404).json({ message: "Director not found" });
    return res.status(200).json(director);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post("/", authorization("admin"), async (req, res) => {
  const { body } = req;
  try {
    const director = await Director.create(body);
    await director.save();
    return res.status(201).json(director);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.patch("/:id", authorization("admin"), async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const director = await Director.findByPk(id);
    if (!director)
      return res.status(404).json({ message: "Director not found" });
    await director.update(body);
    return res.status(200).json(director);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get("/:id/movies", authorization("user", "admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const director = await Director.findByPk(id, {
      include: [{ model: Movie, attributes: ["id_movie", "title", "date"] }],
    });
    if (!director)
      return res.status(404).json({ message: "Director not found" });
    return res.status(201).json(director);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.delete("/:id", authorization("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const director = await Director.findByPk(id);
    if (!director)
      return res.status(404).json({ message: "Director not found" });
    await director.destroy();
    return res.status(200).json({ message: "Director deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
