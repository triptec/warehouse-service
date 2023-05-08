import express from 'express';
import PingController from '../controllers/PingController';
import ProductController from '../controllers/ProductController';

// Create Express router
const router = express.Router();

// Ping route for health checks
router.get('/ping', PingController.getMessage);

// Product routes
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.patch('/products/:id', ProductController.updateProductStock);
router.post('/products', ProductController.createProduct);

// Error route for testing error handling
router.get('/failure', async () => {
    throw new Error('unknown error');
});

export default router;
