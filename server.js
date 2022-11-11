require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (request, response) => {
  response.json({ info: "API --> Peliculas V1" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server Started`);
});
