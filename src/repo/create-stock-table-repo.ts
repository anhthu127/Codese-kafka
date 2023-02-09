import { codesePool, query } from "../configs/database.config";

export const createStockTable = async (data) => {
  const { code } = data;
  const sqlCreateTableStock = `CREATE TABLE ? (id int  NOT NULL AUTO_INCREMENT, code varchar,   exchange int,  tradingDate datetime,  askPrice1 int,  askVol1 int)  PRIMARY KEY (id) `;
  await query(codesePool, sqlCreateTableStock, [code.toUpperCase()]);
};
