export class MsjDto {
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
export function asDto(msjs) {
  if (Array.isArray(msjs)) return msjs.map((m) => new MsjDto(m));
  else return new MsjDto(msjs);
}
