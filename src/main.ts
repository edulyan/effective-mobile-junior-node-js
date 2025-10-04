import express, { Express } from 'express';

import connectToMongoDatabase from './database/mongo-connection';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';

async function init() {
  await connectToMongoDatabase();

  const app: Express = express();

  app.use(express.json());
  app.use('/', authRouter);
  app.use('/users', userRouter);

  const PORT = process.env.HTTP_PORT || 3000;

  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });
}

init();

process
  .on('uncaughtException', (err: Error) => {
    console.error('Uncaught Exception:', err.stack);
    process.exit(1);
  })
  .on('unhandledRejection', (err: Error) => {
    console.error('Unhandled Rejection:', err.stack);
  });
