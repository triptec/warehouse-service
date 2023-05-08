import crypto from 'crypto';
import {
  Body,
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Res,
  Response,
  Route,
  SuccessResponse,
  TsoaResponse,
} from 'tsoa';

import Product, { FormattedProduct } from '../models/Product';
import ProductRepository from '../repositories/ProductRepository';

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

interface UpdateProductStockParams {
  stock: number;
}

interface ProductCreationParams {
  name: string;
  stock: number;
  price: {
    amount: number;
    currency: string;
  };
}

interface ValidateErrorJSON {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}

@Route('products')
export class ProductController extends Controller {
  @Get()
  public async getAllProducts(): Promise<FormattedProduct[]> {
    const products = productRepository.getAllProducts();
    const formattedProducts = products.map((product: Product) => ({
      ...product,
      price: product.formatPrice(),
    }));
    return formattedProducts;
  }

  @Get('{id}')
  public async getProductById(
    @Path() id: string,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<FormattedProduct> {
    const product = productRepository.getProductById(id);
    if (product) {
      const formattedProduct = {
        ...product,
        price: product.formatPrice(),
      };
      return formattedProduct;
    } else {
      return notFoundResponse(404, { reason: 'Product not found' });
    }
  }

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('204', 'Modified')
  @Patch('{id}')
  public async updateProductStock(
    @Path() id: string,
    @Body() requestBody: UpdateProductStockParams,
    @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ) {
    const { stock } = UpdateProductStock.parse(requestBody);
    const updatedProduct = productRepository.updateProductStock(id, stock);
    if (!updatedProduct) {
      return notFoundResponse(404, { reason: 'Product not found' });
    } else {
      return Promise.resolve();
    }
  }

  @SuccessResponse('201', 'Created')
  @Post()
  public async createProduct(@Body() requestBody: ProductCreationParams) {
    const { name, price, stock } = CreateProduct.parse(requestBody);
    const newProduct = new Product(crypto.randomUUID(), name, price, stock);
    productRepository.createProduct(newProduct);
    return newProduct;
  }
}

export default ProductController;
