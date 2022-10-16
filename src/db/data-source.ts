import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/entities/*{.ts,.js}'],
  migrations: ['src/db/migrations/*{.ts,.js}'],
  subscribers: [],
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: +process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USERNAME || 'almustaphaibrahim',
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE || 'code_challenge',
});
