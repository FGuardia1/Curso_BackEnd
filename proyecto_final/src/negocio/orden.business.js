import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();

import OrdenesRepo from "../persistencia/repos/OrdenRepo.js";
const ordenesRepo = OrdenesRepo.getInstancia();
import { enviarMailPedido } from "../services/sendEmail.js";
import { sendmsj, sendwsp } from "../services/sendToPhone.js";
import logger from "../../utils/logger.js";

export const crearOrden = async ({ name, email, telephone }) => {
  try {
    let timestamp = new Date();
    let cart = await cartsRepo.getBySearch({
      email,
    });
    let ordenes = await ordenesRepo.getAll();

    let newOrden = {
      items: cart.items,
      numeroOrden: ordenes.length,
      timestamp,
      estado: "Generada",
      email,
    };

    cart.items = [];
    cartsRepo.modify(cart.id, cart);
    ordenesRepo.create(newOrden);
    // enviarMailPedido({ name, email, lista: cart.items });
    //  sendmsj(telephone);
    // sendwsp({ name, email });
  } catch (error) {
    logger.error(error.message);
  }
};
