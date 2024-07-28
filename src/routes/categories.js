import express from 'express';
import { addCategory, getCategories } from '../controllers/categories.js';
const router = express.Router();

router.get('/category', getCategories);
router.post('/category', addCategory);

export default router;
