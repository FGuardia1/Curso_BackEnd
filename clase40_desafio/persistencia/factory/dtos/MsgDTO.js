export class MsjDto {
  constructor({ id, nombre, apellido, edad, alias, avatar }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.alias = alias;
    this.avatar = avatar;
  }
}
export function asDto(msjs) {
  if (Array.isArray(msjs)) return msjs.map((m) => new MsjDto(m));
  else return new MsjDto(msjs);
}
