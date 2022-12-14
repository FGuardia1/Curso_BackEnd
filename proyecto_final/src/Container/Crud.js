import fs from "fs";
export default class CRUD {
  constructor(fileName) {
    this.fileName = `./src/db/${fileName}`;
  }
  //Genera ID

  //Guarda un objeto
  async create(obj) {
    try {
      const readFile = await this.getAll();
      obj["id"] = Number(await this.getId());
      readFile.push(obj);
      this.writeData(readFile);
      return obj;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async getId() {
    let readFile = await this.getAll();
    if (readFile.length) {
      let id = readFile[readFile.length - 1].id + 1;
      return id;
    } else {
      return 1;
    }
  }

  //Devuelve el objeto con el ID buscado
  async getById(id) {
    try {
      const objects = await this.getAll();
      const obj = objects.find((el) => el.id == id);
      return obj ? obj : null;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  //Modifica un objeto
  async modify(id, objMod) {
    try {
      objMod["id"] = Number(id);
      const elementos = await this.getAll();
      const obj = elementos.find((el) => el.id == id);
      if (!obj) throw new Error("no existe el id " + id);
      const elementosModificados = elementos.map((item) => {
        if (item.id == id) return objMod;
        return item;
      });
      this.writeData(elementosModificados);
      return objMod;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
  //Devuelve un array con los objetos presentes en el archivo
  async getAll() {
    try {
      const data = await this.readData(this.fileName);
      return data;
    } catch (err) {
      return [];
    }
  }
  //Elimina del archivo el objeto con el ID buscado
  async delete(id) {
    try {
      const objects = await this.getAll();
      const filterObjects = objects.filter((el) => el.id != id);
      this.writeData(filterObjects);
    } catch (err) {
      throw new Error(err);
    }
  }

  readData(path) {
    const data = JSON.parse(fs.readFileSync(path, "utf-8") || "[]");
    return data;
  }
  writeData(objects) {
    fs.writeFileSync(this.fileName, JSON.stringify(objects, null, 2));
  }
}
