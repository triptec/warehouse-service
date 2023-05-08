import 'express-async-errors';
import express, { Application, NextFunction, Request, Response } from 'express';
import router from './routes/index';
import { ZodError } from 'zod';

// Create Express app
const app: Application = express();

// Parse JSON bodies
app.use(express.json());

// Register routes
app.use(router);

// Error Handler Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({ errors: err.errors });
  } else {
    // Handle generic error
    console.trace(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;
