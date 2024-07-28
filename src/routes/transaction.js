import express from 'express';
import { getTransaction, addTransaction, deleteTransaction, updateTransaction } from '../controllers/transaction.js';
const router = express.Router();

router.get('/transaction', getTransaction);
router.post('/transaction', addTransaction);
router.put('/transaction/:id', updateTransaction);
router.delete('/transaction/:id', deleteTransaction);

export default router;
