import express from 'express';
import { getSpenlimit, addSpendlimit, getSpenlimitDetails, deleteSpendlimit } from '../controllers/spendlimit.js';
const router = express.Router();

router.get('/spendlimit', getSpenlimit);
router.get('/spendlimit/:category', getSpenlimitDetails);
router.post('/spendlimit', addSpendlimit);
router.delete('/spendlimit/:category', deleteSpendlimit);

export default router;
