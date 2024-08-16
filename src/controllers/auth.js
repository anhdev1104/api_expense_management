import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Accounts from '../models/Accounts.js';
import { generateAccessToken, generateRefreshToken } from '../services/jwtService.js';

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
      const refreshToken = generateRefreshToken(account);

      res.cookie(
        'refreshToken',
        refreshToken
        // {
        //   sameSite: 'Strict',
        //   httpOnly: true,
        //   secure: process.env.SECURE === 'production',
        // }
      );
      const { password, ...hashedAccount } = account._doc; // tách password tăng tính bảo mật
      return res.status(200).json({
        accessToken,
        data: {
          ...hashedAccount,
        },
        expiresIn: process.env.JWT_ACCESS_EXP,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const requestRefreshToken = async (req, res) => {
  try {
    const { token: refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Bạn chưa xác thực !' });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      // tạo mới accessToken
      const newAccessToken = generateAccessToken(user);
      return res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
