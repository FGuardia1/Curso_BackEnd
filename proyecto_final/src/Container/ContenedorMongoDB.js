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

  async findAll() {
    let prod = await this.collection.find();

    console.log(prod[0]);
  }
}
