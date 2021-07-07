const SequelizeSlugify = require("sequelize-slugify");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Perfume = sequelize.define("Perfume", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
      defaultValue: 4,
    },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Perfume, { source: ["name"] });
  return Perfume;
};
