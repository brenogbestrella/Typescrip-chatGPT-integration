import dotenv from 'dotenv';
import OpenAI from 'openai-api';
import path from 'path';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import HomeRouter from './routes/home';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use('/', HomeRouter);

interface CustomError extends Error {
  status?: number;
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
