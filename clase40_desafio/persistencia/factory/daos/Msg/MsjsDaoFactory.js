import MsjsDaoFile from "./MsjsDaoFile.js";
import MsjsDaoMem from "./MsjsDaoMem.js";
const rutaArchivoProds = "./msjs.txt";
import parseArgs from "minimist";
const options = {
  default: { opcionDao: "Mem" },
};
const argumentos = parseArgs(process.argv.slice(2), options);

const OPCION_DAO = argumentos.opcionDao;

let dao;
switch (OPCION_DAO) {
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
