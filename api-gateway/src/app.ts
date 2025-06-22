import express from 'express';
import helmet from 'helmet'
import { errorMiddleware } from './middlewares/error.middleware';
import { corsConfig } from './config/cors';
import { requestLogger } from './middlewares/request-logger.middleware';
import { rateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { authServiceProxy } from './routes/auth.route';
import { adminServiceProxy } from './routes/admin.route';
import { authMiddleware } from './middlewares/auth.middleware';


const app = express();
app.use(helmet());
app.use(corsConfig);
app.use(express.json());
app.use(requestLogger)
app.use(rateLimitMiddleware)

app.use('/api/v1/auth', authServiceProxy())
app.use('/api/v1/admins', authMiddleware, adminServiceProxy())
app.use('/api/v1/events', authMiddleware, adminServiceProxy())
app.use('/api/v1/users', authMiddleware, adminServiceProxy())
app.use('/api/v1/bookings', authMiddleware, adminServiceProxy())
app.use('/api/v1/payments', authMiddleware, adminServiceProxy())

app.use(errorMiddleware)
export { app }