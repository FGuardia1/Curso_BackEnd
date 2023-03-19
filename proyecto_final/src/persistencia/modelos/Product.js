export default class Producto {
  constructor({
    nombre,
    timestamp,
    descripcion,
    codigo,
    precio,
    stock,
    foto,
    _id,
    id,
  }) {
    (this.nombre = nombre),
      (this.timestamp = timestamp),
      (this.descripcion = descripcion),
      (this.codigo = codigo),
      (this.precio = precio),
      (this.stock = stock),
      (this.foto = foto);
    this.id = _id || id;
  }
}
