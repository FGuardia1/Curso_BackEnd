const getRandomNumber = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

export const getCollectionRandom = (cant) => {
  let collect = {};
  let numberRandom;
  for (let i = 0; i < cant; i++) {
    numberRandom = getRandomNumber();
    collect[numberRandom] = ++collect[numberRandom] || 1;
  }
  return collect;
};
