let prod_prueba = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png",
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-64.png",
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-64.png",
  },
];

const messages_prueba = [
  {
    author: "Juan@gmail.com",
    text: "¡Hola! ¿Qué tal?",
    date: "29/10/2022, 21:00:53",
  },
  {
    author: "Miguel@gmail.com",
    text: "¿Todo bien?",
    date: "5/11/2022, 22:12:53",
  },
];

const { options_mariaDB, options_sqlite3 } = require("./connection/index");

const productsDB = require("knex")(options_mariaDB);
const messagesDB = require("knex")(options_sqlite3);

productsDB.schema
  .createTable("productos", (table) => {
    table.increments("id");
    table.string("title");
    table.string("thumbnail");
    table.integer("price");
  })
  .then(() => console.log("Table created"))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => productsDB.destroy());

messagesDB.schema
  .createTable("messages", (table) => {
    table.increments("id");
    table.string("author");
    table.string("text");
    table.string("date");
  })
  .then(() => console.log("Table created"))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => messagesDB.destroy());

productsDB("productos")
  .insert(prod_prueba)
  .then(console.log("productos agregados"))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => productsDB.destroy());

messagesDB("messages")
  .insert(messages_prueba)
  .then(console.log("productos agregados"))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => messagesDB.destroy());
