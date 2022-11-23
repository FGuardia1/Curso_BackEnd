import admin from "firebase-admin";
import serviceAccount from "../../utils/ecommercebackend-4361c-firebase-adminsdk-jgv5y-9434387c1c.json" assert { type: "json" };
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
let db;
async () => {};

export default class ContenedorFirebase {
  constructor(coleccion) {
    this.init(coleccion);
    ///No se puede user async en un constructor
  }
  async init(coleccion) {
    try {
      db = admin.firestore();
      console.log("FIREBASE CONECTADO");
    } catch (e) {
      console.log("ERROR AL CONECTAR A FIREBASE ", e);
    }
    this.collections = db.collection(coleccion);
  }
  async create(data) {
    try {
      const document = this.collections.doc();
      // nos brinda un documento temporal con un id autogenerado
      await document.create(data);
      // ese documento le agrega datos y lo guarda
      console.log("creado !");
    } catch (e) {
      console.error("Error al buscar los docuementos: ", e);
    }
  }

  async findOne(id) {
    try {
      const document = await this.collections.doc(id).get();
      // document me va a responder const con funcionalida
      // y la funcion data es un getter a los datos que
      // tiene almacenado
      return document.data();
    } catch (e) {
      console.error("Error al buscar un docuemento: ", e);
    }
  }
  async findAll() {
    try {
      const document = await this.collections.get();
      return document.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    } catch (e) {
      console.error("Error al crear un docuemento: ", e);
    }
  }

  async update(id, data) {
    try {
      const document = this.collections.doc(id);
      await document.update(data);
      console.log("updateado !");
    } catch (e) {
      console.error("Error al updatear un docuemento: ", e);
    }
  }

  async remove(id) {
    try {
      const document = this.collections.doc(id);
      await document.delete();
      console.log("eliminado !");
    } catch (e) {
      console.error("Error al eliminar un docuemento: ", e);
    }
  }
}
