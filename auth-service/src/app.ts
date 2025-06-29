import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { authRouter } from './routes/auth.route';
import cookieParser from 'cookie-parser'; 

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/', authRouter);
app.use(errorMiddleware);

export { app }; 