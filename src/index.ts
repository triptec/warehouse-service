import express, { Request, Response } from 'express';

// Create Express instance
const app = express();
const port = 3000;

// Define a route handler
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
