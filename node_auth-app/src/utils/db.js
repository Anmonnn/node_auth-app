import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const client = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'postgres',
});

// export const client = new Sequelize(
//   process.env.DB_DATABASE,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD || '111',
//   { dialect: 'postgres' }
// );

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

/*
  All credentials setted to default values (exsept password - it is exapmle)
  replace if needed with your own
*/

// export const client = new Sequelize({
//   database: POSTGRES_DB || 'node_register',
//   username: POSTGRES_USER || 'postgres',
//   host: POSTGRES_HOST || 'localhost',
//   dialect: 'postgres',
//   port: POSTGRES_PORT || 5432,
//   password: POSTGRES_PASSWORD || '111',
// });
