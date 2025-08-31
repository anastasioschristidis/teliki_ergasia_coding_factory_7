const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const { isAdmin } = require('../middleware/adminMiddleware');

const { createProductReview } = require('../controllers/productController');


const router = express.Router();

// /api/products
router.route('/')
  .get(getProducts)
  .post(protect, createProduct); // Προστατεύεται

router.get('/top', getTopProducts);

// /api/products/:id
router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

router.post('/:id/reviews', protect, createProductReview);


module.exports = router;
