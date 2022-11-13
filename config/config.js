require('dotenv').config();

const config = {
  username: "root",
  password: "",
  database: "moviesbedu",
  host: "127.0.0.1",
  port: 3306,
  dialect: 'mysql',
  appPort: 3000,
  secret: 'elpalancasjimenez',
  secretExp: '24d'
};

if(process.env.NODE_ENV == 'production'){
  config.username = process.env.DB_USER;
  config.password = process.env.DB_PASSWORD;
  config.database = process.env.DB_DATABASE;
  config.host = process.env.DB_HOST;
  config.port = process.env.DB_PORT;
  config.appPort = process.env.PORT;
  config.secret = process.env.JWT_SECRETKEY;
  config.secretExp = process.env.JWT_EXPIRESIN;
}


module.exports = config;