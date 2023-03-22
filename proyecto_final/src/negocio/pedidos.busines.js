import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();
import { enviarMailPedido } from "../services/sendEmail.js";
import { sendmsj, sendwsp } from "../services/sendToPhone.js";
import logger from "../../utils/logger.js";

export const crearPedido = async ({ idUser, name, email, telephone }) => {
  try {
    let cart = await cartsRepo.getBySearch({
      userId: idUser,
    });

    // enviarMailPedido({ name, email, lista: cart.productos });
    //  sendmsj(telephone);
    // sendwsp({ name, email });
  } catch (error) {
    logger.error(error.message);
  }
};
