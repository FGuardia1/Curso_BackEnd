export default class Msj {
  constructor({ nombre, apellido, edad, alias, avatar }) {
    this.id = "";
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.alias = alias;
    this.avatar = avatar;
  }

  setId(id) {
    if (!id) throw new Error('"id" es un campo requerido');
    this.id = id;
  }
}
