import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();

import logger from "../../utils/logger.js";
import { enviarMailRegistro } from "../services/sendEmail.js";

export const comprobarCarrito = async (userId) => {
  let cart = await cartsRepo.getBySearch({
    userId: userId,
  });

  if (!cart) {
    let timestamp = new Date().toLocaleString();
    let productos = [];
    try {
      await cartsRepo.create({ timestamp, productos, userId });
    } catch (error) {
      logger.error(error.message);
    }
  }
};

export const crearCarritoRegistro = async (userEmail, address, datosEmail) => {
  let timestamp = new Date().toLocaleString();
  let items = [];

  try {
    let newCartId = await cartsRepo.create({
      timestamp,
      direccion: address,
      items,
      email: userEmail,
    });
    // enviarMailRegistro(datosEmail);
  } catch (error) {
    logger.error(error);
  }
};
