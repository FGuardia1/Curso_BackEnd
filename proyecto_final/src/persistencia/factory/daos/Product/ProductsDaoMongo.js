import mongoose from "mongoose";

import { proyectConfig } from "../../../../../utils/configs/config.js";
const DB_URL = proyectConfig.URL_MONGO_ATLAS + "&dbName=ecommerceBackend";
import logger from "../../../../../utils/logger.js";

export default class ProductsDaoMongo {
  constructor(collection) {
    this.collection = collection;
  }

  async init() {
    await mongoose.connect(DB_URL);
    logger.info("conectado");
  }

  async create(data) {
    let newElem = await this.collection.create(data);
    return newElem._id;
  }

  async getById(id) {
    return await this.collection.findOne({ _id: id });
  }

  async getBySearch(filter) {
    return await this.collection.findOne(filter).lean();
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
  async deleteAll() {
    await this.collection.deleteMany({});
  }
}
