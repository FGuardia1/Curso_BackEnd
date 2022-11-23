import ContenedorMongoDB from "../../Container/ContenedorMongoDB.js";
import productos from "../../../utils/models/productos.js";
export default class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(productos);
  }
}
