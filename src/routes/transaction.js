import express from 'express';
import {
  getTransaction,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionByType,
  getTransactionByDate,
  getTransactionDetails,
} from '../controllers/transaction.js';
const router = express.Router();

router.get('/transaction', getTransaction);
router.get('/transaction/:category', getTransactionDetails);
router.get('/transaction/:type', getTransactionByType);
router.get('/transactionbydate', getTransactionByDate);

router.post('/transaction', addTransaction);
router.put('/transaction/:id', updateTransaction);
router.delete('/transaction/:id', deleteTransaction);

export default router;
