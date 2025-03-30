import express from 'express';

// Routes
import TestCrudRoute from './routes/testCrud.js';

// Middleware
import errorHandler from './middleware/errorHandler.js';
import ApodRoute from './routes/apod.js';

/**
 * Starts an Express server.
 *
 * @param {number} port - The port number on which the server will listen.
 */
const startServer = (port = 5000) => {
  const app = express();
  const router = express.Router();

  // Add routes
  new TestCrudRoute(router);
  new ApodRoute(router);

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(router);
  app.use(errorHandler);

  // serve static docs if not in production
  if (process.env.NODE_ENV !== 'production') {
    app.use('/docs', express.static('docs'));
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer(process.env.PORT);
