import mongoose from "mongoose";

import { asDto } from "../../dtos/ProductDTO.js";

const productSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  price: { type: Number },
  thumbnail: { type: String },
});

export default class ProductsDaoDb {
  constructor(cnxStr) {
    this.cnxStr = cnxStr;
    this.productos = mongoose.model("Producto", productSchema);
  }

  async init() {
    await mongoose.connect(this.cnxStr);
    console.log("producto dao en mongodb -> listo");
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log("producto dao en mongodb -> cerrado");
  }

  async getAll() {
    const product = await this.productos.find({});
    return asDto(product);
  }

  async getById(idBuscado) {
    const product = await this.productos.findOne({ id: idBuscado });
    return asDto(product);
  }

  async save(prodNew) {
    await this.productos.create(prodNew);
    return asDto(prodNew);
  }

  async deleteById(idParaBorrar) {
    const borrada = await this.productos.findOneAndDelete({ id: idParaBorrar });
    return asDto(borrada);
  }

  async deleteAll() {
    await this.productos.deleteMany({});
  }

  async updateById(idParaReemplazar, newProduct) {
    const actualizada = await this.productos.findOneAndUpdate(
      { id: idParaReemplazar },
      { $set: newProduct }
    );
    return asDto(actualizada);
  }
}
