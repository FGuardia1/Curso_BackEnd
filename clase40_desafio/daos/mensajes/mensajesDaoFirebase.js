import { ContenedorFirebase } from "../../Container/ContenedorFirebase";

export class MensajesDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("mensajes");
  }
}
