import Product from '../models/product';

class ProductRepository {
  private products: Product[];

  constructor() {
    this.products = [
      new Product(
        'f74fb16e-62b2-4af1-abed-1a0516200d1b',
        'Dining Chair',
        { amount: 429.99, currency: 'SEK' },
        4
      ),
      new Product(
        '014571de-30fc-4ae6-8d74-2f3641790e42',
        'Dining Table',
        { amount: 5999.99, currency: 'SEK' },
        1
      ),
    ];
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  updateProductStock(id: string, stock: number): Product | undefined {
    const product = this.getProductById(id);
    if (product) {
      product.stock = stock;
    }
    return product;
  }

  createProduct(product: Product): void {
    this.products.push(product);
  }
}

export default ProductRepository;
