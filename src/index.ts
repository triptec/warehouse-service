import express, { Application } from 'express';
import router from './routes';
import config from './configs/config';

// Create Express app
const app: Application = express();

// Parse JSON bodies
app.use(express.json());

// Register routes
app.use(router);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
