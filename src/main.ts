import express, { Express } from 'express';

import { connectToMongoDatabase } from './database/mongo-connection';

async function init() {
  await connectToMongoDatabase();

  const app: Express = express();

  app.use(express.json());

  const PORT = process.env.HTTP_PORT || 3000;

  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });
}

init();

process
  .on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  })
  .on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
