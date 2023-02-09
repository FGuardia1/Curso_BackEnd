import express from "express";
const routerPedido = express.Router();
import { carritoDAO } from "../daos/index.js";
import { enviarMailPedido } from "../services/sendEmail.js";
import { sendmsj, sendwsp } from "../services/sendToPhone.js";
import logger from "../../utils/logger.js";
routerPedido.post("/new", async (req, res) => {
  const { _id: idUser, name, email, telephone } = req.user;
  try {
    let cart = await carritoDAO.getBySearch({
      userId: idUser,
    });

    enviarMailPedido({ name, email, lista: cart.productos });
    sendmsj(telephone);
    sendwsp({ name, email });
  } catch (error) {
    logger.error(error);
  }
});

export default routerPedido;