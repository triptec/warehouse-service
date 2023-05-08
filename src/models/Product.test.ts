import Product from './Product';

describe('ProductModel', () => {
  describe('formatPrice', () => {
    it('should format the price correctly', () => {
      const product = new Product(
        'some-id',
        'some-name',
        { amount: 123.45, currency: 'SEK' },
        4
      );

      expect(product.formatPrice()).toBe('123.45 SEK');
    });
  });
});
