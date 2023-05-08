import express, { Application } from 'express';
import router from './routes';
import config from './configs/config';

const app: Application = express();

app.use(router);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
