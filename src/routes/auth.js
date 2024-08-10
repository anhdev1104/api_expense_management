import express from 'express';
import { getAccounts, register } from '../controllers/auth.js';
const router = express.Router();

router.get('/accounts', getAccounts);
router.post('/accounts', register);

export default router;
