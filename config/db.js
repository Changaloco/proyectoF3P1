const { Sequelize } = require("sequelize");

const entidadesModel = require("../models/entidades");
const marcasModel = require("../models/marcas");
const modelosModel = require("../models/modelos");
const placasModel = require("../models/placas");
const propietariosModel = require("../models/propietarios");
const rolesModel = require("../models/roles");
const usuariosModel = require("../models/usuarios");
const vehiculosModel = require("../models/vehiculos");

const sequelize = new Sequelize("registro_vehicular", "root", "Hola.1234@", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});

const models = [
  entidadesModel,
  marcasModel,
  modelosModel,
  placasModel,
  propietariosModel,
  rolesModel,
  usuariosModel,
  vehiculosModel,
];

for (let model of models) model(sequelize);

// Configuring relations
const {
  entidades,
  marcas,
  modelos,
  placas,
  propietarios,
  roles,
  usuarios,
  vehiculos,
} = sequelize.models;
// reviews.belongsTo(products); // Relation one-to-one in reviews table
// orders.belongsTo(users); // Relation: Order has one user
// orders.belongsTo(products); // Relation: Order has one product

module.exports = sequelize;
