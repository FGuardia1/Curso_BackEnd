const fs = require("fs");

class ChatHistory {
  constructor(nombreArchivo) {
    this.nombreArchivo = `./public/${nombreArchivo}.txt`;
  }

  async save(obj) {
    try {
      let arrayArchivo = [];
      try {
        const lectura = await this.getAll();
        if (lectura) {
          arrayArchivo = lectura.map((item) => {
            return item;
          });
        }
      } catch {
        console.log(`Error en la lectura `, error);
      }
      arrayArchivo.push(obj);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(arrayArchivo, null, 3)
      );
      console.log("escrito correctamente");
    } catch (error) {
      console.log(`Error en escritura `, error);
    }
  }

  async getAll() {
    try {
      const archivo = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(archivo);
    } catch (error) {
      console.log(`fallo lectura `, error);
    }
  }
}
module.exports = ChatHistory;
