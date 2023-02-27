import ProductsApi from "../api/ProductsApi.js";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
  input ProductInput {
    title: String,
    price: Float,
    thumbnail: String
  }
  type Product {
    id: ID!
    title: String,
    price: Float,
    thumbnail: String
  }
  type Query {
    getProducts: [Product],
  }
  type Mutation {
    createProduct(datos: ProductInput): Product
    updateProduct(id: ID!,datos: ProductInput): Product,
    deleteProduct(id: ID!): Product,
  }
`);

export default class GraphQLController {
  constructor() {
    const api = new ProductsApi();
    return graphqlHTTP({
      schema: schema,
      rootValue: {
        getProducts: api.getProducts,
        createProduct: api.createProduct,
        updateProduct: api.updateProduct,
        deleteProduct: api.deleteProduct,
      },
      graphiql: true,
    });
  }
}
