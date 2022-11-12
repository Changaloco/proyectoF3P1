const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const Director = sequelize.models.directors;
const authorization = require("../middlewares/authorization");

router.get("/", authorization("user", "admin"), async (req, res) => {
  try {
    const directors = await Director.findAll();
    res.status(200).json(directors);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", authorization("user", "admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const director = await Director.findByPk(id);
    if (!director)
      return res.status(404).json({ message: "Director not found" });
    res.status(200).json(director);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/", authorization("admin"), async (req, res) => {
  const { body } = req;
  try {
    const director = await Director.create(body);
    await director.save();
    res.status(201).json(director);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
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
    res.status(200).json(director);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/:id", authorization("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const director = await Director.findByPk(id);
    if (!director)
      return res.status(404).json({ message: "Director not found" });
    await director.destroy();
    res.status(200).json({ message: "Director deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
