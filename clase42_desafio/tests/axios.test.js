import axios from "axios";
const product = {
  title: "prueba",
  price: 122,
  thumbnail: "imagen.jpg",
};

axios.defaults.baseURL = "http://localhost:8080";
await axios.post("/product", product);
let prods = await axios.get("/product");
console.log("prods " + JSON.stringify(prods.data));
//let resp = await axios.delete("/product/2");
//console.log("prod eliminado" + JSON.stringify(resp.data));
let resp = await axios.put("/product/4", {
  title: "modificado",
  price: 222,
  thumbnail: "imagen.jpg",
});
