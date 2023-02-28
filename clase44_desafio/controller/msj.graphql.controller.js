import MsjsApi from "../api/MsjsApi.js";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
  input MsjInput {
    email: String,
    nombre: String,
    apellido: String,
    edad: String,
    alias: String,
    avatar: String,
    texto: String,
    date: String
  }
  type Msj {
    id: ID!
    email: String,
    nombre: String,
    apellido: String,
    edad: String,
    alias: String,
    avatar: String,
    texto: String,
    date: String
  }
  type Query {
    getMsjs: [Msj],
  }
  type Mutation {
    createMsj(datos: MsjInput): Msj,
  }
`);

export default class MsjGraphQLController {
  constructor() {
    const api = new MsjsApi();
    return graphqlHTTP({
      schema: schema,
      rootValue: {
        getMsjs: api.getMsjs,
        createMsj: api.createMsj,
      },
      graphiql: true,
    });
  }
}
