import express from 'express';
import { getTransaction, addTransaction } from '../controllers/transaction.js';
const router = express.Router();

router.get('/transaction', getTransaction);
router.post('/transaction', addTransaction);

export default router;
