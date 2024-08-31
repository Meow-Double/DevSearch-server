import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as useRouter } from './routes/index.js';
import mongoose from 'mongoose';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, 'uploads')));

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log('mongodb success'))
  .catch((err) => console.log('mongodb error', err));

app.use('/api', useRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
