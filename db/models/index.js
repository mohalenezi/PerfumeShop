"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// model Relationships
// creates a many to one relation with Perfume "meshari notes"

db.Shop.hasMany(db.Perfume, {
  foreignKey: "shopId",
  allowNull: false,
  as: "perfumes",
});
db.Perfume.belongsTo(db.Shop, {
  as: "shop",
  foreignKey: "shopId",
});
db.User.hasOne(db.Shop, {
  as: "shop",
  foreignKey: "userId",
});

db.Shop.belongsTo(db.User, { as: "user" });

db.User.hasMany(db.Order, { foreignKey: "userId", as: "orders" });
db.Order.belongsTo(db.User, { as: "user" });
db.Order.belongsToMany(db.Perfume, {
  through: db.OrderItem,
  foreignKey: "orderId",
});
db.Perfume.belongsToMany(db.Order, {
  through: db.OrderItem,
  foreignKey: "perfumeId",
});

module.exports = db;
