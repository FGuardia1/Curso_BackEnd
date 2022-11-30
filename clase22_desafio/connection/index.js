const options_sqlite3 = {
  client: "sqlite3",
  connection: {
    filename: "./DB/ecommerce.sqlite",
  },
};

const options_mariaDB = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
};

module.exports = {
  options_mariaDB,
  options_sqlite3,
};
