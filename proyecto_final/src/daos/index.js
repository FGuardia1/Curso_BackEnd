import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import ProductosDaoMongoDB from "../daos/productos/ProductosDaoMongoDB.js";

import CarritosDaoFirebase from "./carritos/CarritosDaoFirebase.js";
import CarritosDaoMongoDB from "./carritos/CarritosDaoMongoDB.js";

let carritoDAO = new CarritosDaoMongoDB();
let productosDAO = new ProductosDaoMongoDB();

export { productosDAO, carritoDAO };
