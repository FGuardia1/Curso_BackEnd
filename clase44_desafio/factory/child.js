import getCollectionRandom from "../utils/randoms.utils.js";

let res;

process.on("message", (msg) => {
  res = getCollectionRandom(msg);
  process.send(res);
});
