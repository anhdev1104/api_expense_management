import bcrypt from 'bcrypt';
import Accounts from '../models/Accounts.js';
import { generateAccessToken } from '../services/jwtService.js';

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Accounts.find();
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const existingAccount = await Accounts.findOne({ email: req.body.email });
    if (existingAccount) {
      return res.status(400).json({ message: 'Email đã tồn tại !' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAccount = new Accounts({ ...req.body, password: hashedPassword });
    const saveAccount = await newAccount.save();
    return res.status(200).json(saveAccount);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    // Authentication
    const account = await Accounts.findOne({ email: req.body.email });
    if (!account) {
      return res.status(404).json({ message: 'Không tìm thấy email !' });
    }
    const validPassword = await bcrypt.compare(req.body.password, account.password);
    if (!validPassword) {
      return res.status(404).json({ message: 'Mật khẩu nhập vào không khớp !' });
    }

    // Authorization
    if (account && validPassword) {
      const accessToken = generateAccessToken(account);
      return res.status(200).json({ accessToken });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
