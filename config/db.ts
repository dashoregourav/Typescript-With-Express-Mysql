import mysql, { Connection } from "mysql2";
import env from "dotenv";
env.config();

export const connection: Connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export const mydb: Promise<number> = new Promise((resolve, reject) => {
  connection.connect((err) => {
    if (err) {
      reject(err);
      return;
    } else {
      resolve(Number(process.env.PORT));
    }
  });
});
