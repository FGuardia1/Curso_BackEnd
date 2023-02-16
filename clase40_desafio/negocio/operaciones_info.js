import { cpus } from "os";
const numCpu = cpus().length;

export const getInfoSystem = async () => {
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

  return info;
};
