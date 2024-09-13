import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './index.js';

dotenv.config();

const port = process.env.PORT || 3000

let server
let mongooseConnection

beforeAll(async () => {
  server = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
  })
  mongooseConnection = await mongoose.connect(process.env.MONGO_URI);
  console.log('Conectado a MongoDB');
});

afterAll(async () => {
  if (server) {
    server.close(() => {
      console.log('Servidor detenido.');
    });
  }
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.collection('users').deleteMany({
      email: { $regex: '@example.com$', $options: 'i' },
    });

    await mongoose.connection.close();
  }
});
