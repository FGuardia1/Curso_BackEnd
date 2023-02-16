export default class Msj {
  constructor({ email, texto, date, nombre, apellido, edad, alias, avatar }) {
    this.id = "";
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.alias = alias;
    this.avatar = avatar;
    this.texto = texto;
    this.date = date;
  }

  setId(id) {
    if (!id) throw new Error('"id" es un campo requerido');
    this.id = id;
  }
}
