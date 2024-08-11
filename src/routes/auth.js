import express from 'express';
import { getAccounts, login, register } from '../controllers/auth.js';
const router = express.Router();

router.get('/accounts', getAccounts);
router.post('/register', register);
router.post('/login', login);

export default router;
