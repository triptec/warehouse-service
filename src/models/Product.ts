interface Price {
  amount: number;
  currency: string;
}

class Product {
  id: string;
  name: string;
  price: Price;
  stock: number;

  constructor(id: string, name: string, price: Price, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  formatPrice(): string {
    return `${this.price.amount} ${this.price.currency}`;
  }
}

export default Product;
