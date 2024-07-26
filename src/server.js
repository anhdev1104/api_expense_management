import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDB.js';
dotenv.config();
import transactionRouter from './routes/transaction.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

// CONNECT DATABASE
connectDB(process.env.URI_DATABASE);

app.use('/api/v1', transactionRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api/v1`);
});
