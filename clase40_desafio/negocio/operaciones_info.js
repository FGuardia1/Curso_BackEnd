const { guardarFile } = require("../persistencia/archivo.js");

const numCpu = require("os").cpus().length;

const getInfoSystem = async () => {
  let info = {
    argumentos: process.argv,
    nombrePlataforma: process.platform,
    versionNode: process.version,
    memoria: process.resourceUsage().maxRSS,
    pathEjec: process.execPath,
    IdProceso: process.pid,
    carpetaProy: process.cwd(),
    cantProc: numCpu,
  };

  let a = await guardarFile(info);
  return info;
};

module.exports = getInfoSystem;
