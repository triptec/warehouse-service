import express, { Application } from 'express';
import router from './routes/index';

// Create Express app
const app: Application = express();

// Parse JSON bodies
app.use(express.json());

// Register routes
app.use(router);

export default app;
