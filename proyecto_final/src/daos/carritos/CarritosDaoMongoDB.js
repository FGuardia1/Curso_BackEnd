import carritos from "../../../utils/models/carritos.js";
import ContenedorMongoDB from "../../Container/ContenedorMongoDB.js";

export default class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(carritos);
  }
}
