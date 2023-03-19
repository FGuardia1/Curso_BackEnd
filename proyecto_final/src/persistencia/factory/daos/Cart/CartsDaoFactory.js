import CartsDaoMongo from "./CartsDaoMongo.js";

const rutaArchivoProds = "./msjs.txt";
import carritos from "../../../../../utils/models/carritos.js";
const OPCION_DAO = "Mongo";

let dao;
switch (OPCION_DAO) {
  case "File":
    dao = "new MsjsDaoFile(rutaArchivoProds);";
    await dao.init();
    break;
  case "Mongo":
    dao = new CartsDaoMongo(carritos);
    await dao.init();
    break;
  default:
    dao = "new MsjsDaoFile(rutaArchivoProds);";
    await dao.init();
}
export default class CartsDaoFactory {
  static getDao() {
    return dao;
  }
}
