// import { config } from 'dotenv';
// config();

export const mysqlConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  ssl:
    process.env.DB_PROTOCOL === 'DEV'
      ? false
      : {
          rejectUnauthorized: false,
        },
};

export const minioConfig = {
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  host: process.env.MINIO_HOST,
  port: process.env.MINIO_PORT,
  ssl: process.env.NODE_ENV == 'production',
};
