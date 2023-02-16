import { MockService } from "../service/mock.service";

import { MensajesDaoFirebase } from "./mensajes/mensajesDaoFirebase";

let productDAO = new MockService();
let chatDAO = new MensajesDaoFirebase();
export { productDAO, chatDAO };
