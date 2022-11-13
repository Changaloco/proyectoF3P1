const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authentication");

router.use("/users", require("./users"));
router.use("/directors", authenticate, require("./directors"));
router.use("/movies", authenticate, require("./movies"));
router.use("/casts", authenticate, require("./casts"));
router.use("/genres", authenticate, require("./genres"));
router.use("/actors", authenticate, require("./actors"));

module.exports = router;
