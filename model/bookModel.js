const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");
const sequelize = new Sequelize("BooksDB", "root", "gayatri@18321", {
  host: "localhost",
  user: "root",
  database: "ExampleDB",
  dialect: "mysql", // You should replace this with your database connection details
  password: "paasword",
  pool: db,
});

const Book = sequelize.define(
  "Book",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    Genre: {
      type: DataTypes.STRING(30), // You changed the genre column length to 30
    },
    Publication_year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

sequelize.sync();
module.exports = Book;
