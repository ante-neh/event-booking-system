import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { authRouter } from './routes/auth.route';

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRouter)
app.use(errorMiddleware)
export { app }; 