import { Request, Response } from 'express';

import ProductRepository from '../repositories/ProductRepository';
import Product from '../models/product';
import crypto from 'crypto';

const productRepository = new ProductRepository();

function validateId(id: string | undefined): string {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid ID parameter');
  }
  return id;
}

class ProductController {
  static async getAllProducts(_req: Request, res: Response) {
    const products = productRepository.getAllProducts();
    const formattedProducts = products.map((product: Product) => ({
      ...product,
      price: product.formatPrice(),
    }));
    res.json(formattedProducts);
  }

  static async getProductById(req: Request, res: Response) {
    const id = validateId(req.params['id']);
    const product = productRepository.getProductById(id);
    if (product) {
      const formattedProduct = {
        ...product,
        price: product.formatPrice(),
      };
      res.json(formattedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }

  static async updateProductStock(req: Request, res: Response) {
    const id = validateId(req.params['id']);
    const { stock } = req.body;
    const updatedProduct = productRepository.updateProductStock(id, stock);
    if (updatedProduct) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }

  static async createProduct(req: Request, res: Response) {
    const { name, price, stock } = req.body;
    const newProduct = new Product(crypto.randomUUID(), name, price, stock);
    productRepository.createProduct(newProduct);
    res.status(201).json(newProduct);
  }
}

export default ProductController;
