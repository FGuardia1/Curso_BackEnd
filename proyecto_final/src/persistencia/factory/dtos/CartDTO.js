export class CartDto {
  constructor({
    id,
    nombre,
    apellido,
    edad,
    alias,
    avatar,
    email,
    texto,
    date,
  }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.alias = alias;
    this.avatar = avatar;
    this.email = email;
    this.texto = texto;
    this.date = date;
  }
}
export function asDto(cart) {
  if (Array.isArray(cart)) return msjs.map((m) => new CartDto(m));
  else return new CartDto(cart);
}
