import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();
import { enviarMailPedido } from "../services/sendEmail.js";
import { sendmsj, sendwsp } from "../services/sendToPhone.js";
import logger from "../../utils/logger.js";

import { crearPedido } from "../negocio/pedidos.busines.js";
export const createPedido = async (req, res) => {
  const { _id: idUser, name, email, telephone } = req.user;
  crearPedido({ idUser, name, email, telephone });
  res.status(200);
};
