const fs = require("fs");
class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = `./${nombreArchivo}.txt`;
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
      let arrayLength = arrayArchivo.length;
      if (arrayLength != 0) {
        obj.id = arrayArchivo[arrayArchivo.length - 1].id + 1;
      } else {
        obj.id = 1;
      }
      arrayArchivo.push(obj);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(arrayArchivo, null, 3)
      );
      console.log("escrito correctamente");
      return obj.id;
    } catch (error) {
      console.log(`Error en escritura `, error);
    }
  }

  async getById(Number) {
    let arrayArchivo = [];
    try {
      const lectura = await this.getAll();
      if (lectura) {
        arrayArchivo = lectura.map((item) => {
          return item;
        });
        return arrayArchivo.find((element) => element.id === Number);
      }
    } catch {
      console.log(`fallo lectura `, error);
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

  async deleteById(Number) {
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
        console.log(`Error al leer `, error);
      }
      arrayArchivo = arrayArchivo.filter((item) => item.id != Number);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(arrayArchivo, null, 3)
      );
      console.log("borrado correctamente");
    } catch (error) {
      console.log(`Error en escritura `, error);
    }
  }

  async deleteAll() {
    try {
      let arrayArchivo = [];
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(arrayArchivo, null, 3)
      );
      console.log("borrado correctamente");
    } catch (error) {
      console.log(`Error en escritura `, error);
    }
  }
}
module.exports = Contenedor;
