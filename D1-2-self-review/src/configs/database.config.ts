import mysql from 'mysql2'
import { DB_PORT } from '../constants/kafka.constant';

export const dbConfig = {
    timezone: 'Asia/Ho_Chi_Minh',
    limitConnection: 5,
};

export const dbName = 'stock-market'


export const codesePool = mysql.createPool({
    connectionLimit: dbConfig.limitConnection,
    host: 'localhost',
    port: DB_PORT,
    user: 'root',
    password: 'password',
    database: dbName
})

export const query = async (
    pool: mysql.Pool,
    sql: string,
    params?: any,
): Promise<any> =>
    new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(`SQL ERROR : =====  ${error} `);
            }

            return resolve(results);
        });
    });