const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Image = sequelize.define(
  "image",
  {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // productId
  },
  { timestamps: false }
);

module.exports = Image;
