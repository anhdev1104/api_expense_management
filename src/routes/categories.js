import express from 'express';
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryByType,
  updateCategory,
} from '../controllers/categories.js';
const router = express.Router();

router.get('/category', getCategories);
router.get('/category/:type', getCategoryByType);
router.post('/category', addCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router;
