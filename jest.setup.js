import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.collection('users').deleteMany({
    email: { $regex: '@example.com$', $options: 'i' },
  });

  await mongoose.connection.close();
});
