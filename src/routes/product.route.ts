import { Router } from 'express';
import productController from '../controllers/product.controller';
import restrictToAdmin from '../middleware/restrictToAdmin';
import validateUser from '../middleware/validateUser';

const router = Router();

// Get all products from database
// @return a [products]
router.get('/', productController.getProducts);

// Count number of Products in database
// @returns a Number of products => int
router.get('/count-products', validateUser, restrictToAdmin, productController.countProducts);

// Deletes any products by the [ids]
// ids should be sent in the body in a form of an array
// @returns Number of products delete => int
router.delete('/', validateUser, restrictToAdmin, productController.deleteProducts);

// Post an product to /products
router.post('/create-product', validateUser, restrictToAdmin, productController.createProduct);

export default router;
