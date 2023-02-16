import ProductsDaoFile from "./ProductsDaoFile.js";
import ProductsDaoMem from "./ProductsDaoMem.js";

import parseArgs from "minimist";

const options = {
  default: { opcionDao: "Mem" },
};
const argumentos = parseArgs(process.argv.slice(2), options);

const OPCION_DAO = argumentos.opcionDao;

const rutaArchivoProds = "./products.txt";

let dao;
switch (OPCION_DAO) {
  case "File":
    dao = new ProductsDaoFile(rutaArchivoProds);
    await dao.init();
    break;
  default:
    dao = new ProductsDaoMem();
}
export default class ProductsDaoFactory {
  static getDao() {
    return dao;
  }
}
