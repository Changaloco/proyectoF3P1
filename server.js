const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
  response.json({ info: "API --> Registro_Vehicular V1" });
});

// app.use('/api', require('./routes'))

app.listen(3000);
