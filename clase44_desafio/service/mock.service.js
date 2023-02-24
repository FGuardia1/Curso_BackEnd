import { createFakeProduct } from "../utils/product.utils.js";

export default class MockService {
  items = [];
  constructor() {
    for (let i = 1; i <= 5; i++) {
      const newItem = createFakeProduct(i);
      this.items.push(newItem);
    }
  }

  getAll() {
    return this.items;
  }
}
