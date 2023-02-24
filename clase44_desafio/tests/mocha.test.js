import supertest from "supertest";
let request = supertest("http://localhost:8080");

import { expect } from "chai";

let prods = [
  {
    title: "lapiz",
    price: "200",
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-64.png",
    id: 1,
  },
  {
    title: "lapiz",
    price: "200",
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-64.png",
    id: 2,
  },
  {
    title: "calculadora",
    price: "4000",
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-64.png",
    id: 3,
  },
];
const newproduct = {
  title: "producto nuevo",
  price: 123,
  thumbnail: "imagen.jpg",
};

describe("test de metodos de productos", function () {
  it("test de traer todos los productos", async function () {
    let resp = await request.get("/product");

    expect(resp._body).to.deep.equal(prods);
  });

  it("test de agregar producto", async function () {
    let resp = await request.post("/product").send(newproduct);
    //quito la propiedad id ya que fue generada al momento de la insercion
    delete resp._body.id;
    expect(resp._body).to.deep.equal(newproduct);
  });

  it("test de modificar producto", async function () {
    const prodModif = {
      title: "producto modificado",
      price: 222,
      thumbnail: "imagenNueva.jpg",
    };
    let resp = await request.put("/product/3").send(prodModif);
    //quito la propiedad id ya que fue generada al momento de la insercion
    delete resp._body.id;
    expect(resp._body).to.deep.equal(prodModif);
  });

  it("test de eliminar producto", async function () {
    let resp = await request.delete("/product/4");
    //quito la propiedad id ya que fue generada al momento de la insercion
    delete resp._body.id;
    expect(resp._body).to.deep.equal(newproduct);
  });
});
