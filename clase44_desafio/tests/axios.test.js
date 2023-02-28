import axios from "axios";
const newProduct = {
  title: "prueba",
  price: 122,
  thumbnail: "imagen.jpg",
};

axios.defaults.baseURL = "http://localhost:8080";
//obtener productos

let prods = await axios.post(
  "/graphql",
  {
    query: `query {
    getProducts {
      id
      title
      thumbnail
      price
    }
  }`,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
prods = await prods.data;

console.log(prods.data.getProducts);

//crear producto
await axios.post(
  "/graphql",
  {
    query: `mutation {
      createProduct(datos: {
        title: "${newProduct.title}",
        price: ${newProduct.price},
        thumbnail: "${newProduct.thumbnail}"
      }) {
        id
        title
        thumbnail
        price
      }
    }`,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

//modificar producto
await axios.post(
  "/graphql",
  {
    query: `mutation {
      updateProduct(id:"3",datos: {
        title: "calculadora modificada",price:2222,thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
      }) {
        id
        title
        
      }
    }`,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

//eliminar producto
await axios.post(
  "/graphql",
  {
    query: `mutation {
      deleteProduct(id:4) {
        id
        title
        
      }
    }`,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
