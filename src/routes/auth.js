import express from 'express';
import { getAccounts, login, register, requestRefreshToken } from '../controllers/auth.js';
const router = express.Router();

router.get('/accounts', getAccounts);
router.post('/register', register);
router.post('/login', login);
router.post('/refreshToken', requestRefreshToken);

export default router;
