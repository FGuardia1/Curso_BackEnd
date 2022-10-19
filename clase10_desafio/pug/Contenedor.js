let prod_prueba = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-64.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-64.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-64.png",
    id: 3,
  },
];

class Contenedor {
  constructor() {
    this.productos = prod_prueba;
  }

  save(obj) {
    this.productos.push(obj);
  }
  getAll() {
    return this.productos;
  }
}
module.exports = Contenedor;
