import { DataSource } from 'typeorm';
import { config as ENVConfig } from 'dotenv';

ENVConfig();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.USER_SERVICE_DB_HOST,
  port: Number(process.env.USER_SERVICE_DB_PORT),
  database: process.env.USER_SERVICE_DB_DATABASE,
  username: process.env.USER_SERVICE_DB_USER,
  password: process.env.USER_SERVICE_DB_PASSWORD,
  entities: ['./apps/users/src/**/*.entity{.ts,.js}'],
  migrations: ['./apps/users/src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});

export default AppDataSource;
