import express from 'express';
import helmet from 'helmet'
import { errorMiddleware } from './middlewares/error.middleware';
import { corsConfig } from './config/cors';
import { requestLogger } from './middlewares/request-logger.middleware';
import { rateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { authServiceProxy } from './routes/auth.route';
import { adminServiceProxy } from './routes/admin.route';
import { authMiddleware } from './middlewares/auth.middleware';
import { eventServiceProxy } from './routes/event.route';
import { userServiceProxy } from './routes/user.route';
import { bookingServiceProxy } from './routes/booking.route';

const app = express();

app.use(helmet());
app.use(corsConfig);
app.use(express.json());
app.use(requestLogger);
app.use(rateLimitMiddleware);

app.use('/api/v1/auth', authServiceProxy());
app.use('/api/v1/admins', authMiddleware, adminServiceProxy());
app.use('/api/v1/events', authMiddleware, eventServiceProxy());
app.use('/api/v1/users', authMiddleware, userServiceProxy());
app.use('/api/v1/bookings', authMiddleware, bookingServiceProxy());

app.use(errorMiddleware)

export { app }