export class ProductDto {
  constructor({ title, price, thumbnail, id }) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.id = id;
  }
}
export function asDto(prods) {
  if (Array.isArray(prods)) return prods.map((p) => new ProductDto(p));
  else return new ProductDto(prods);
}
