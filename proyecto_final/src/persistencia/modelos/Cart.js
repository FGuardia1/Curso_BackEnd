export default class Cart {
  constructor({ timestamp, userId, productos, _id, id }) {
    this.timestamp = timestamp;
    this.userId = userId;
    this.productos = productos;
    this.id = _id || id;
  }
}
