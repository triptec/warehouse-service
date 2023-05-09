import app from './app';
import config from './configs/config';

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
