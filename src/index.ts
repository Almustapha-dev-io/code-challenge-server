import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './db/data-source';
import routes from './routes';
import errorMiddleware from './middleware/error';

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errorMiddleware);

const startApp = async () => {
  try {
    const PORT = process.env.PORT;
    await AppDataSource.initialize();
    console.log(`Database connected successfully.`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
