import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cadastroclientes',
  password: 'tvantena',
  port: 5432,
});
