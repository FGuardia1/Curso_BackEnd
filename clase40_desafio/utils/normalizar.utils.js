import normalizr from "normalizr";

const normalizar = normalizr.normalize;
const desnormalizar = normalizr.denormalize;

const authorSchema = new normalizr.schema.Entity("author");

const mensajeSchema = new normalizr.schema.Entity("mensaje", {
  author: authorSchema,
});
const chatSchema = new normalizr.schema.Entity("chat", {
  mensajes: [mensajeSchema],
});

export { normalizar, desnormalizar, chatSchema };
