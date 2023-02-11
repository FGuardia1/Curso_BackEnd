let fs = require("fs");
const nameDB = "./DB.json";
const getAll = async () => {
  try {
    const datos = await fs.promises.readFile(nameDB, "utf-8");
    return JSON.parse(datos);
  } catch (e) {
    return [];
  }
};
const save = async (dato) => {
  const datos = await getAll();
  datos.push(dato);
  await fs.promises.writeFile(nameDB, JSON.stringify(datos, null, 2));
  return datos;
};
const guardarFile = async (dato) => {
  save(dato);
};
const listarFile = async () => {
  return await getAll();
};
module.exports = { guardarFile, listarFile };
