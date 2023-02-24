export default class Producto {
  #title;
  #price;
  #thumbnail;
  #id;
  constructor({ title, price, thumbnail, id = "" }) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.id = id;
  }

  setId(id) {
    if (!id) throw new Error('"id" es un campo requerido');
    this.id = id;
  }
}
