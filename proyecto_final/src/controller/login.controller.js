import { carritoDAO } from "../daos/index.js";
import { enviarMailRegistro } from "../services/sendEmail.js";
import logger from "../../utils/logger.js";

const logOut = (req, res) => {
  try {
    req.logout(req.user, (err) => {
      if (err) return next(err);
      res.render("logout");
    });
  } catch (error) {
    logger.error(error.message);
  }
};

const login = (req, res) => {
  res.redirect("/home");
};

const register = async (req, res) => {
  let userId = req.session.passport.user;
  let timestamp = new Date().toLocaleString();
  let productos = [];
  try {
    let newCartId = await carritoDAO.create({ timestamp, productos, userId });
    enviarMailRegistro(req.body);
    res.redirect("/home");
  } catch (error) {
    logger.error(error);
  }
};

export { register, login, logOut };
