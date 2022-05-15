const express = require("express");
const cors = require("cors");
const userRoutes = require("../routes/user");
const profileRoutes = require("../routes/profile");
const formRoutes = require("../routes/form");
const sequelize = require("../connection/connection");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3005;
    this.apiPaths = {
      users: "/api/users",
      profiles: "/api/profiles",
      forms: "/api/forms",
    };

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await sequelize.authenticate();
      console.log("Conexión exitosa a base de datos");
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
    this.app.use(this.apiPaths.profiles, profileRoutes);
    this.app.use(this.apiPaths.forms, formRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

module.exports = Server;
