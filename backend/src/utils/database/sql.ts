import sql, { ConnectionPool, IRecordSet, Request } from 'mssql';
import { config } from '@/config';

let pool: ConnectionPool;

const dbConfig = {
  user: config.database.user,
  password: config.database.password,
  server: config.database.server,
  database: config.database.database,
  port: config.database.port,
  options: {
    encrypt: config.database.options.encrypt,
    trustServerCertificate: config.database.options.trustServerCertificate,
  },
};

export const getPool = async (): Promise<ConnectionPool> => {
  if (pool && pool.connected) {
    return pool;
  }
  try {
    pool = await new sql.ConnectionPool(dbConfig).connect();
    console.log('Database connection pool created successfully.');
    pool.on('error', (err) => {
      console.error('Database Pool Error:', err);
    });
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw new Error('Failed to connect to the database.');
  }
};

export const dbRequest = async (): Promise<Request> => {
  const connectionPool = await getPool();
  return connectionPool.request();
};

// Type definitions for common database results
export interface ICreateObjectResult {
  id: number;
}

export type { IRecordSet };
