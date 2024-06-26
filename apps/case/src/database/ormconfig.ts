import { DataSource } from 'typeorm';
import { config as ENVConfig } from 'dotenv';

ENVConfig();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.CASE_SERVICE_DB_MIGRATION_HOST,
  port: Number(process.env.CASE_SERVICE_DB_PORT),
  database: process.env.CASE_SERVICE_DB_DATABASE,
  username: process.env.CASE_SERVICE_DB_USER,
  password: process.env.CASE_SERVICE_DB_PASSWORD,
  entities: ['./apps/CASE/src/**/*.entity{.ts,.js}'],
  migrations: ['./apps/CASE/src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});

export default AppDataSource;
