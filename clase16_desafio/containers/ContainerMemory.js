class ContainerMemory {
  constructor(options, tableName) {
    this.dataBase = require("knex")(options);
    this.tableName = tableName;
  }

  async getAll() {
    return await this.dataBase.from(this.tableName).select("*");
  }

  async save(element) {
    let id = await this.dataBase(this.tableName).insert(element);
    element.id = id;
    return element;
  }

  async getById(id) {
    return await this.dataBase.from(this.tableName).where("id", id);
  }

  updateById(id, newData) {
    this.dataBase.from(this.tableName).where("id", id).update(newData);
  }

  deleteById(id) {
    this.dataBase.from(this.tableName).where("id", id).del();
  }
}

module.exports = ContainerMemory;
