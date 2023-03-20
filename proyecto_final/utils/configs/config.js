import { config } from "dotenv";
config();
const env = process.env;
export const emailConfig = {
  name: "Fernando",
  user: env.GMAIL_USER,
  password: env.GMAIL_PASS,
};

export const twilioConfig = {
  auth: env.TWILIO_AUTH,
  pass: env.TWILIO_PASS,
  cel: env.TWILIO_CEL,
  celAdmin: env.TWILIO_CEL_ADMIN,
  celwsp: env.TWILIO_CEL_WSP,
};

export const proyectConfig = {
  URL_MONGO_ATLAS: env.URL_MONGO_ATLAS,
  PORT: env.PORT,
  PERSISTENCIA: env.PERSISTENCIA,
};
