import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.get('/', (req, res) => {
  res.send('hello word');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/api/v1`);
});
