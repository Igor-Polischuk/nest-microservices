import { DataSource } from 'typeorm';
import { config as ENVConfig } from 'dotenv';

ENVConfig();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.AUTH_SERVICE_DB_MIGRATION_HOST,
  port: Number(process.env.AUTH_SERVICE_DB_PORT),
  database: process.env.AUTH_SERVICE_DB_DATABASE,
  username: process.env.AUTH_SERVICE_DB_USER,
  password: process.env.AUTH_SERVICE_DB_PASSWORD,
  entities: ['./apps/auth/src/**/*.entity{.ts,.js}'],
  migrations: ['./apps/auth/src/database/migrations/*{.ts,.js}'],
  synchronize: false,
});

export default AppDataSource;
