import express from 'express'; 
import { errorMiddleware } from './middlewares/error.middlewares';
import { userProfileRouter } from './routes/user-profile.routes';

const app = express();

app.use(express.json())
app.use("/", userProfileRouter)
app.use(errorMiddleware)
export { app }