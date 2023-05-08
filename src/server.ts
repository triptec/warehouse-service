import config from './configs/config';

import app from './app';

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
