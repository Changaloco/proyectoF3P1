require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/config");
const port = config.appPort;
const app = express();
const sequelize = require("./config/db");
const options = require("./swagger");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (request, response) => {
  response.json({ info: "API --> Peliculas V1" });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));
app.use('/api', require('./routes'))
app.listen(port || 3001, () => {
  console.log(`Server Started on port ${process.env.PORT || 3001}`);
});

try{
  sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully!");
  });
  sequelize.sync({force:false}).then(() => {
    console.log("Database verification correct!");
  });
}catch(e){
  console.log(`Database conecttion error: ${e}`);
}