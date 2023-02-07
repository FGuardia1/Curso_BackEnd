import mongoose from "mongoose";

const DB_URL =
  "mongodb+srv://fer:contra123@cluster0.emeikir.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerceBackend";

export default class ContenedorMongoDB {
  constructor(collection) {
    this.collection = collection;
    this.init();
  }

  async init() {
    await mongoose.connect(DB_URL);
    console.log("conectado");
  }

  async create(data) {
    let newElem = await this.collection.create(data);
    return newElem._id;
  }

  async getById(id) {
    return await this.collection.findOne({ _id: id });
  }

  async getBySearch(filter) {
    return await this.collection.findOne(filter);
  }
  async getAll() {
    return await this.collection.find().lean();
  }

  async modify(id, data) {
    await this.collection.update({ _id: id }, { $set: data });
  }

  async delete(id) {
    await this.collection.deleteOne({ _id: id });
  }
}
