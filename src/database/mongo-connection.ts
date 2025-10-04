import mongoose from 'mongoose';

async function connectToMongoDatabase() {
  const mongoDbUri =
    process.env.MONGO_URL || 'mongodb://localhost:27017/effective-mobile-junior-node-js';

  try {
    await mongoose.connect(mongoDbUri, {
      dbName: 'effective-mobile-junior-node-js',
    });
    console.log('Connected to Mongo DB');
  } catch (error) {
    console.error('Could not connect to db');
    process.exit(1);
  }
}

export default connectToMongoDatabase;
