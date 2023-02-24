import axios from "axios";
const newProduct = {
  title: "prueba",
  price: 122,
  thumbnail: "imagen.jpg",
};

axios.defaults.baseURL = "http://localhost:8080";
//obtener productos
let prods = await axios.get("/product");
console.log("prods " + JSON.stringify(prods.data));

//crear producto
await axios.post("/product", newProduct);

//modificar producto
resp = await axios.put("/product/4", {
  title: "modificado",
  price: 222,
  thumbnail: "imagen.jpg",
});

//eliminar producto
let resp = await axios.delete("/product/4");
console.log("prod eliminado" + JSON.stringify(resp.data));
