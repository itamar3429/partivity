// import { config } from 'dotenv';
// config();

export const mysqlConfig = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  ssl:
    process.env.MYSQL_PROTOCOL === 'DEV'
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
