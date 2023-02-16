export class ProductDto {
  constructor({ id, title, price, thumbnail }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}
export function asDto(prods) {
  if (Array.isArray(prods)) return prods.map((p) => new ProductDto(p));
  else return new ProductDto(prods);
}
