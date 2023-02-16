import MsjsDaoFile from "./MsjsDaoFile.js";
import MsjsDaoMem from "./MsjsDaoMem.js";
const rutaArchivoProds = "./msjs.txt";

const opcion = "File" || "Mem";

let dao;
switch (opcion) {
  case "File":
    dao = new MsjsDaoFile(rutaArchivoProds);
    await dao.init();
    break;
  default:
    dao = new MsjsDaoMem();
}
export default class MsjsDaoFactory {
  static getDao() {
    return dao;
  }
}
