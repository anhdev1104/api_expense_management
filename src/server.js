import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDB.js';
dotenv.config();
import transactionRouter from './routes/transaction.js';
import categoriesRouter from './routes/categories.js';
import spendlimitRouter from './routes/spendlimit.js';
import authRouter from './routes/auth.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

connectDB(process.env.URI_DATABASE);

app.use('/api/v1', authRouter);
app.use('/api/v1', transactionRouter);
app.use('/api/v1', categoriesRouter);
app.use('/api/v1', spendlimitRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api/v1`);
});
