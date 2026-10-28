import 'reflect-metadata'; // <-- Adicione isso na linha 1
import { DataSource } from 'typeorm';

const dbConfig = {
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'better-sqlite3', // alterado aqui
      database: 'db.sqlite',
      entities: ['src/**/*.entity.ts'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'better-sqlite3', // alterado aqui
      database: 'test.sqlite',
      entities: ['src/**/*.entity.ts'],
      migrationsRun: true
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      }
    });
    break;
  default:
    throw new Error(`Unsupported environment variable`);
}

export const AppDataSource = new DataSource(dbConfig);
