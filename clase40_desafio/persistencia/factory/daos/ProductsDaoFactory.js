import ProductsDaoDb from "./ProductsDaoDb.js";

import ProductsDaoFile from "./ProductsDaoFile.js";
import ProductsDaoMem from "./ProductsDaoMem.js";

const rutaArchivoProds = "./products.txt";
const cnxStr = "mongodb://localhost/test";

const opcion = "File" || "Mem";

let dao;
switch (opcion) {
  case "Mongo":
    dao = new ProductsDaoDb(cnxStr);
    //  await dao.init();
    break;
  case "File":
    dao = new ProductsDaoFile(rutaArchivoProds);
    //  await dao.init();
    break;
  default:
    dao = new ProductsDaoMem();
}
export default class ProductsDaoFactory {
  static getDao() {
    return dao;
  }
}
