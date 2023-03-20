export class CartDto {
  constructor({ timestamp, userId, productos }) {
    this.timestamp = timestamp;
    this.userId = userId;
    this.productos = productos;
  }
}
export function asDto(cart) {
  if (Array.isArray(cart)) return msjs.map((m) => new CartDto(m));
  else return new CartDto(cart);
}
