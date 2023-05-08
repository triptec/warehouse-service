import Product from '../models/Product';
import ProductRepository from './ProductRepository';

describe('ProductRepository', () => {
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepository();
  });

  test('getAllProducts should return all products', () => {
    const products = productRepository.getAllProducts();
    expect(products.length).toBe(2);
  });

  test('getProductById should return the correct product', () => {
    const id = 'f74fb16e-62b2-4af1-abed-1a0516200d1b';
    const product = productRepository.getProductById(id);

    expect(product?.id).toBe(id);
    expect(product?.name).toBe('Dining Chair');
  });

  test('getProductById should return undefined for non-existent product', () => {
    const id = 'non-existent-id';
    const product = productRepository.getProductById(id);

    expect(product).toBeUndefined();
  });

  test('updateProductStock should update the stock of an existing product', () => {
    const id = 'f74fb16e-62b2-4af1-abed-1a0516200d1b';
    const newStock = 10;
    const updatedProduct = productRepository.updateProductStock(id, newStock);

    expect(updatedProduct?.id).toBe(id);
    expect(updatedProduct?.stock).toBe(newStock);
  });

  test('updateProductStock should return undefined for non-existent product', () => {
    const id = 'non-existent-id';
    const newStock = 10;
    const updatedProduct = productRepository.updateProductStock(id, newStock);

    expect(updatedProduct).toBeUndefined();
  });

  test('createProduct should add a new product', () => {
    const newProduct = new Product(
      'some-id',
      'some-name',
      { amount: 123.45, currency: 'SEK' },
      5
    );

    productRepository.createProduct(newProduct);

    const products = productRepository.getAllProducts();

    expect(products.length).toBe(3);
    expect(products).toContain(newProduct);
  });
});
