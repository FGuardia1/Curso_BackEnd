import mongoose, { Mongoose } from "mongoose";
const carritosCollection = "carritos";
const carritosSchema = new mongoose.Schema({
  timestamp: { type: String },
  productos: [
    {
      nombre: String,
      timestamp: String,
      descripcion: String,
      codigo: String,
      precio: Number,
      stock: Number,
      foto: String,
      _id: mongoose.SchemaTypes.ObjectId,
    },
  ],
});
const carritos = new mongoose.model(carritosCollection, carritosSchema);
export default carritos;
