import mongoose from 'mongoose';

export async function connectToMongoDatabase() {
  const db = (
    await mongoose.connect(
      process.env.MONGO_URL || 'mongodb://localhost:27017/effective-mobile-junior-node-js',
    )
  ).connection;

  db.on('error', console.error.bind(console, 'connection error'));

  db.once('open', function () {
    console.log('Connected to Mongo DB');
  });

  return db;
}
