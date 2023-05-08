import { Request, Response } from 'express';

import ProductRepository from '../repositories/ProductRepository';
import Product from '../models/Product';
import crypto from 'crypto';
import { validateId } from '../utils/validation';

const productRepository = new ProductRepository();
import { z } from 'zod';

const CreateProduct = z.object({
  name: z.string().min(1).max(255),
  stock: z.number().min(0),
  price: z.object({
    amount: z.number().min(0),
    currency: z.enum(['SEK', 'EUR', 'USD']),
  }),
});

const UpdateProductStock = z.object({
  stock: z.number().min(0),
});

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
    const { stock } = UpdateProductStock.parse(req.body);
    const updatedProduct = productRepository.updateProductStock(id, stock);
    if (updatedProduct) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }

  static async createProduct(req: Request, res: Response) {
    const { name, price, stock } = CreateProduct.parse(req.body);
    const newProduct = new Product(crypto.randomUUID(), name, price, stock);
    productRepository.createProduct(newProduct);
    res.status(201).json(newProduct);
  }
}

export default ProductController;
