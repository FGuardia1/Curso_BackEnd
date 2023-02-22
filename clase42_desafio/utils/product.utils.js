import { faker } from "@faker-js/faker";

faker.locale = "es";

export const createFakeProduct = (id) => {
  return {
    id,
    title: faker.commerce.product(),
    price: faker.commerce.price(100, 800),
    thumbnail: faker.image.business(100, 100, true),
  };
};
